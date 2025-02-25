import client from "../db/db-config/connect.db";
import { Service } from '../db/models/Service';

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