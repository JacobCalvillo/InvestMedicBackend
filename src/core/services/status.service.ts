import client from '../../config/db/connect.db';
import { Status } from '../../infrastructure/database/models/Status';

export const getStatuses = async ():Promise<Status[] | null> => {
    try {
        const statuses = await client.query(`SELECT * FROM Status`);
        return statuses.rows || null
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getStatus = async(id: number): Promise<Status | null> => {
    try {
        const status = await client.query(`SELECT * FROM Status WHERE id = $1`, [id]);
        return status.rows[0] || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const createStatus = async (name:string): Promise<Status | null> => {
    try {
        console.log(name);
        const status =  await client.query(`INSERT INTO Status (name) VALUES ($1)`, [name]);
        return status.rows[0] || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}