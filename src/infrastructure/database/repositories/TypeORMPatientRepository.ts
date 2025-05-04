// src/infrastructure/database/repositories/TypeORMPatientRepository.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db/typeORM.config";
import { PatientEntity } from "../entities/PatientEntity";
import { Patient } from "../../../core/domain/entities/Patient";
import { PatientRepository } from "../../../core/domain/interfaces/repositories/PatientRepository";

export class TypeORMPatientRepository implements PatientRepository {
    private repository: Repository<PatientEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(PatientEntity);
    }

    save(patient: Patient): Promise<Patient> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Patient[]> {
        // Include relation to user for more complete data
        return this.repository.find({
            relations: ['user']
        });
    }

    async findById(id: number): Promise<Patient | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['user']
        });
    }

    async findByUserId(userId: number): Promise<Patient | null> {
        return this.repository.findOne({
            where: { userId },
            relations: ['user']
        });
    }

    async create(patient: Omit<Patient, "id">): Promise<Patient> {
        const newPatient = this.repository.create(patient);
        return this.repository.save(newPatient);
    }

    async update(patient: Patient): Promise<Patient | null> {
        if (!patient.id) {
            throw new Error('Patient ID is required for update');
        }

        // First verify patient exists
        const existingPatient = await this.repository.findOne({
            where: { id: patient.id }
        });
        if (!existingPatient) {
            return null;
        }

        // Update fields
        Object.assign(existingPatient, patient);

        // Save changes
        return this.repository.save(existingPatient);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }

    // Additional method for TypeORMPatientRepository
    async createPatientWithIdentification(
        patient: Omit<Patient, "id">,
        identificationNumber: string,
        identificationTypeId: number,
        identificationDocumentUrl: string
    ): Promise<Patient | null> {
        // Use TypeORM's transaction capabilities
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Create patient
            const patientRepository = queryRunner.manager.getRepository(PatientEntity);
            const newPatient = patientRepository.create({
                name: patient.name,
                lastName: patient.lastName,
                birthDate: patient.birthDate,
                gender: patient.gender,
                street: patient.street,
                city: patient.city,
                state: patient.state,
                postalCode: patient.postalCode,
                occupation: patient.occupation,
                emergencyContactName: patient.emergencyContactName,
                emergencyContactLastName: patient.emergencyContactLastName,
                emergencyContactRelationship: patient.emergencyContactRelationship,
                emergencyContactPhone: patient.emergencyContactNumber, // Note: field name differs in entity
                maritalStatus: patient.maritalStatus,
                privacyConsent: patient.privacyConsent,
                userId: patient.userId
            });

            const savedPatient = await patientRepository.save(newPatient);

            // Create identification
            const identificationRepository = queryRunner.manager.getRepository(IdentificationUserEntity);
            const newIdentification = identificationRepository.create({
                number: identificationNumber,
                identificationDocumentUrl: identificationDocumentUrl,
                identificationTypeId: identificationTypeId
            });

            const savedIdentification = await identificationRepository.save(newIdentification);

            // Create patient identification relation
            const patientIdentificationRepository = queryRunner.manager.getRepository(PatientIdentificationEntity);
            const patientIdentification = patientIdentificationRepository.create({
                patientId: savedPatient.id,
                identificationId: savedIdentification.id
            });

            await patientIdentificationRepository.save(patientIdentification);

            // Commit transaction
            await queryRunner.commitTransaction();
            
            return savedPatient;
        } catch (error) {
            // Rollback in case of error
            await queryRunner.rollbackTransaction();
            console.error('Transaction failed:', error);
            return null;
        } finally {
            // Release the query runner resources
            await queryRunner.release();
        }
    }
}