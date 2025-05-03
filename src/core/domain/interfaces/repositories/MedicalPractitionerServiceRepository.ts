// src/core/domain/interfaces/repositories/MedicalPractitionerServiceRepository.ts
import { MedicalPractitionerService } from '../../entities/MedicalPractitionerService';

export interface MedicalPractitionerServiceRepository {
    findByMedicalPractitionerId(medicalPractitionerId: number): Promise<MedicalPractitionerService[]>;
    findByServiceId(serviceId: number): Promise<MedicalPractitionerService[]>;
    create(medicalPractitionerService: MedicalPractitionerService): Promise<MedicalPractitionerService>;
    delete(medicalPractitionerId: number, serviceId: number): Promise<boolean>;
    exists(medicalPractitionerId: number, serviceId: number): Promise<boolean>;
}