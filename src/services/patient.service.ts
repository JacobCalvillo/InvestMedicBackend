import client from '../db/db-config/connect.db'
import {Patient} from '../db/models/Patient';
import * as QueryString from "qs";

export const getAllPatients = async (): Promise<Patient[] | null> => {
    try {
        const query = `
            SELECT p.*, u.username, u.email, u.phone, u.profile_picture_url
            FROM patient p
                     INNER JOIN "User" u ON p.user_id = u.id
        `;

        const patients = await client.query(query);

        if (!patients.rows || patients.rows.length === 0) {
            return [];
        }

        // Extracted mapping function for readability
        const mapToPatient = (patientRow: any): Patient => ({
            id: patientRow.id,
            name: patientRow.name,
            lastName: patientRow.last_name,
            birthDate: patientRow.birth_date,
            weight: patientRow.weight,
            height: patientRow.height,
            gender: patientRow.gender,
            street: patientRow.street,
            city: patientRow.city,
            state: patientRow.state,
            postalCode: patientRow.postal_code,
            occupation: patientRow.occupation,
            emergencyContactName: patientRow.emergency_contact_name,
            emergencyContactLastName: patientRow.emergency_contact_last_name,
            emergencyContactRelationship: patientRow.emergency_contact_relationship,
            emergencyContactPhone: patientRow.emergency_contact_phone,
            maritalStatus: patientRow.marital_status,
            privacyConsent: patientRow.privacy_consent,
            userId: patientRow.user_id,
            user: {
                username: patientRow.username,
                email: patientRow.email,
                phone: patientRow.phone,
                profile_picture_url: patientRow.profile_picture_url
            }
        });

        return patients.rows.map(mapToPatient);
    } catch (error) {
        return [];
    }
};

export const getPatientById = async (id: number): Promise<Patient | null> => {
    try {
        const query = `
            SELECT p.*, u.username, u.email, u.phone, u.profile_picture_url
            FROM patient p
                     INNER JOIN "User" u ON p.user_id = u.id
            WHERE p.id = $1
        `;
        const patient = await client.query(query, [id]);

        if (patient.rows.length === 0) {
            return null;
        }

        const row = patient.rows[0];

        return {
            id: row.id,
            name: row.name,
            lastName: row.last_name,
            birthDate: row.birth_date,
            weight: row.weight,
            height: row.height,
            gender: row.gender,
            street: row.street,
            city: row.city,
            state: row.state,
            postalCode: row.postal_code,
            occupation: row.occupation,
            emergencyContactName: row.emergency_contact_name,
            emergencyContactLastName: row.emergency_contact_last_name,
            emergencyContactRelationship: row.emergency_contact_relationship,
            emergencyContactPhone: row.emergency_contact_phone,
            maritalStatus: row.marital_status,
            privacyConsent: row.privacy_consent,
            userId: row.user_id,
            user: {
                username: row.username,
                email: row.email,
                phone: row.phone,
                profile_picture_url: row.profile_picture_url
            }
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createPatientWithIdentification = async (
    patient: Omit<Patient, "id">,
    number: string | QueryString.ParsedQs | (string | QueryString.ParsedQs)[] | undefined,
    identificationTypeId: number,
    identificationDocumentUrl: string | QueryString.ParsedQs | (string | QueryString.ParsedQs)[] | undefined,
): Promise<boolean> => {
    try {
        await client.query('BEGIN'); // Begin transaction
        // Step 1: Insert into the `patient` table
        const insertPatientQuery = `
            INSERT INTO patient (
                name, 
                last_name, 
                birth_date,
                gender,
                street,
                city,
                state,
                postal_code,
                occupation,
                emergency_contact_name,
                emergency_contact_last_name,
                emergency_contact_relationship,
                emergency_contact_phone,
                marital_status,
                privacy_consent,
                user_id
            ) 
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
            ) 
            RETURNING id;
        `;
        const patientResult = await client.query(insertPatientQuery, [
            patient.name,
            patient.lastName,
            patient.birthDate,
            patient.gender,
            patient.street,
            patient.city,
            patient.state,
            patient.postalCode,
            patient.occupation,
            patient.emergencyContactName,
            patient.emergencyContactLastName,
            patient.emergencyContactRelationship,
            patient.emergencyContactPhone,
            patient.maritalStatus,
            patient.privacyConsent,
            patient.userId
        ]);
        const patientId = patientResult.rows[0]?.id;
        if (!patientId) new Error('Failed to create patient');

        // Step 2: Insert into `identification_user` table
        const insertIdentificationQuery = `
            INSERT INTO identification_user (number, identification_document_url, identification_type_id) 
            VALUES ($1, $2, $3) 
            RETURNING id;
        `;
        const identificationResult = await client.query(insertIdentificationQuery, [
            number,
            identificationDocumentUrl,
            identificationTypeId
        ]);

        const identificationId = identificationResult.rows[0]?.id;
        if (!identificationId) new Error('Failed to create identification_user');

        // Step 3: Link patient and identification in `patient_identification`
        const insertPatientIdentificationQuery = `
            INSERT INTO patient_identification (patient_id, identification_id) 
            VALUES ($1, $2);
        `;
        await client.query(insertPatientIdentificationQuery, [patientId, identificationId]);

        await client.query('COMMIT'); // Commit the transaction
        return true;
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback transaction on error
        console.error('Transaction failed:', error);
        return false;
    }
};
