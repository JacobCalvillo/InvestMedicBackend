import client from '../../config/db/connect.db'
import { IdentificationType } from '../../infrastructure/database/models/IdentificationType';

export const getIdentificationsType = async(): Promise<IdentificationType[] | null>=> {
    try {
        const identificationTypes = await client.query('SELECT * FROM identification_type');
        return identificationTypes.rows || null;
    } catch (error) {
        return null
    }
}
