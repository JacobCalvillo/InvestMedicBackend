import client from '../../config/db/connect.db';
import { PaymentMethod } from '../../infrastructure/database/models/PaymentMethod';

export const getPaymentMethods = async (): Promise<PaymentMethod[] | null> => {
    try{
        const paymentMethods = await client.query('SELECT * FROM payment_method');
        return paymentMethods.rows || null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
