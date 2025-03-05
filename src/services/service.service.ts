import client from "../db/db-config/connect.db";
import { Service } from '../db/models/Service';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const stripeSession = async (serviceId: number,
                                    customerEmail: string, quantity:number, appointmentId:number) => {
    try {

        const service = await client.query(`SELECT * FROM Service WHERE id = $1`, [serviceId]);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'oxxo'],
            line_items: [
                {
                    price: service.rows[0].stripe_price_id,
                    quantity: quantity || 1,
                },
            ],
            mode: 'payment',
            customer_email: customerEmail,
            success_url: `${process.env.FRONTEND_URL}/success`,
            metadata: {
                appointment_id: appointmentId,
            }
        });

        if (!session) {
            return null;
        }
        return session;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getServices = async (): Promise<Service[] | null> => {
    try {
        const services = await client.query(`SELECT * FROM Service`);
        return services.rows || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getServiceById = async (id: number): Promise<Service | null> => {
    try {
        const service = await client.query(`SELECT * FROM Service WHERE id = $1`, [id]);
        if (!service) {
            return null;
        }
        return service.rows[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const createService = async (service: Service): Promise<Service | null> => {
    try {
        await client.query('BEGIN');

        const newService = await client.query(`INSERT INTO Service (name, description, price) 
            VALUES ($1, $2, $3) RETURNING *`, [service.name, service.description, service.price]);

        const stripeProduct = await stripe.products.create({
            name: service.name,
            description: service.description,
            metadata: {
                productId: newService.rows[0].id,
            }
        });

        const price = await stripe.prices.create({
            unit_amount: newService.rows[0].price * 100,
            currency: 'mxn',
            product: stripeProduct.id
        });

        const serviceWithStripe = await client.query(
            `UPDATE Service
             SET stripe_price_id = $1, stripe_product_id = $2
             WHERE id = $3
             RETURNING *`,
            [price.id, stripeProduct.id, newService.rows[0].id]
        );

        if (!newService || !stripeProduct || !price) {
            await client.query('ROLLBACK');
            return null;
        }

        await client.query('COMMIT');
        return serviceWithStripe.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        return null;
    }
}