import client from '../db/db-config/connect.db'
import { IdentificationType } from '../db/models/IdentificationType';

export const getIdentificationsType = async(): Promise<IdentificationType[] | null>=> {
    try {
        const identificationTypes = await client.query('SELECT * FROM identification_type');
        return identificationTypes.rows || null;
    } catch (error) {
        return null
    }
}
