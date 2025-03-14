import client from '../db/db-config/connect.db';
import { PaymentMethod } from '../db/models/PaymentMethod';

export const getPaymentMethods = async (): Promise<PaymentMethod[] | null> => {
    try{
        const paymentMethods = await client.query('SELECT * FROM payment_method');
        return paymentMethods.rows || null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
