import client from '../../config/db/connect.db';
import { MedicalPractitionerAvailability } from '../../infrastructure/database/models/MedicalPractitionerAvailability';

export const getMedicalPractitionerAvailability = async (): Promise<MedicalPractitionerAvailability[] | null> => {
    try {
        const medicalPractitionerAvailability = await client.query('SELECT * FROM medical_practitioner_availability');
        return medicalPractitionerAvailability.rows || null;
    } catch (error) {
        return null
    }
}


export const getMedicalPractitionerAvailabilityByMedicalId =
    async (id: number): Promise<MedicalPractitionerAvailability | null> => {
    try {
        const query = 'SELECT * FROM medical_practitioner_availability WHERE medical_practitioner_id = $1'

        const medicalPractitionerAvailability = await client.query(query, [id]);

        return medicalPractitionerAvailability.rows[0] || null;
    } catch (error) {
        return null;
    }
}