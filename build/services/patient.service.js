"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatientWithIdentification = exports.getPatientById = exports.getAllPatients = void 0;
const connect_db_1 = __importDefault(require("../db/db-config/connect.db"));
const getAllPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
            SELECT p.*, u.username, u.email, u.phone, u.profile_picture_url
            FROM patient p
                     INNER JOIN "User" u ON p.user_id = u.id
        `;
        const patients = yield connect_db_1.default.query(query);
        if (!patients.rows || patients.rows.length === 0) {
            return [];
        }
        // Extracted mapping function for readability
        const mapToPatient = (patientRow) => ({
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
    }
    catch (error) {
        return [];
    }
});
exports.getAllPatients = getAllPatients;
const getPatientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
            SELECT p.*, u.username, u.email, u.phone, u.profile_picture_url
            FROM patient p
                     INNER JOIN "User" u ON p.user_id = u.id
            WHERE p.id = $1
        `;
        const patient = yield connect_db_1.default.query(query, [id]);
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
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.getPatientById = getPatientById;
const createPatientWithIdentification = (patient, number, identificationTypeId, identificationDocumentUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield connect_db_1.default.query('BEGIN'); // Begin transaction
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
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING *;`;
        const patientResult = yield connect_db_1.default.query(insertPatientQuery, [
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
        const newPatient = patientResult.rows[0];
        if (!newPatient)
            new Error('Failed to create patient');
        // Insertar identificación
        const insertIdentificationQuery = `
            INSERT INTO identification_user (number, identification_document_url, identification_type_id)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
        const identificationResult = yield connect_db_1.default.query(insertIdentificationQuery, [
            number,
            identificationDocumentUrl,
            identificationTypeId
        ]);
        const identificationId = (_a = identificationResult.rows[0]) === null || _a === void 0 ? void 0 : _a.id;
        if (!identificationId)
            new Error('Failed to create identification_user');
        // Relacionar paciente con identificación
        const insertPatientIdentificationQuery = `
            INSERT INTO patient_identification (patient_id, identification_id)
            VALUES ($1, $2);
        `;
        yield connect_db_1.default.query(insertPatientIdentificationQuery, [newPatient.id, identificationId]);
        yield connect_db_1.default.query('COMMIT'); // Commit the transaction
        return newPatient;
    }
    catch (error) {
        yield connect_db_1.default.query('ROLLBACK'); // Rollback transaction on error
        console.error('Transaction failed:', error);
        return null;
    }
});
exports.createPatientWithIdentification = createPatientWithIdentification;
