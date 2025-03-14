import client from "../db/db-config/connect.db";
import { Payment } from "../db/models/Payment";

export const getPayments = async (): Promise<Payment[] | null> => {
    try {
        const payments = await client.query("SELECT * FROM payment");
        return payments.rows || null;
    } catch (error) {
        return null;
    }
}