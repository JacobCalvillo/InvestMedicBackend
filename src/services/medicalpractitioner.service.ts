import client from '../db/db-config/connect.db'
import { MedicalPractitioner } from '../db/models/MedicalPractitioner';

export const getAllMedicalPractitioners = async (): Promise<MedicalPractitioner[] | null> => {
    try {
        const query = `
            SELECT 
                mp.*, 
                u.username, 
                u.email, 
                u.phone, 
                u.profile_picture_url
            FROM 
                Medical_Practitioner mp
            INNER JOIN 
                "User" u 
            ON  
                mp.user_id = u.id
        `;

        const result = await client.query(query);

        // Mapeamos y devolvemos los datos para incluir los datos del usuario relacionado
        return result.rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            lastName: row.last_name,
            birthDate: row.birth_date,
            userId: row.user_id,
            user: {
                username: row.username,
                email: row.email,
                phone: row.phone,
                profile_picture_url: row.profile_picture_url
            }
        })) || null;
    } catch (error) {
        console.error('Error fetching medical practitioners:', error);
        return null;
    }
};