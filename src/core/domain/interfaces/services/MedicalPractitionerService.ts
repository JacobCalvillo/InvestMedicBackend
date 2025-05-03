// src/core/domain/interfaces/services/MedicalPractitionerServiceService.ts
import { MedicalPractitionerService } from '../../entities/MedicalPractitionerService';

export interface MedicalPractitionerServiceService {
    getServicesByMedicalPractitionerId(medicalPractitionerId: number): Promise<MedicalPractitionerService[]>;
    getMedicalPractitionersByServiceId(serviceId: number): Promise<MedicalPractitionerService[]>;
    assignServiceToMedicalPractitioner(medicalPractitionerId: number, serviceId: number): Promise<MedicalPractitionerService>;
    removeServiceFromMedicalPractitioner(medicalPractitionerId: number, serviceId: number): Promise<boolean>;
}