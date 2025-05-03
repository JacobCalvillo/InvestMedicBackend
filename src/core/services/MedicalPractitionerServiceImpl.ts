// src/core/services/MedicalPractitionerServiceImpl.ts
import { MedicalPractitionerService } from "../domain/entities/MedicalPractitionerService";
import { MedicalPractitionerServiceRepository } from "../domain/interfaces/repositories/MedicalPractitionerServiceRepository";
import { MedicalPractitionerRepository } from "../domain/interfaces/repositories/MedicalPractitionerRepository";
import { ServiceRepository } from "../domain/interfaces/repositories/ServiceRepository";
import { MedicalPractitionerServiceService } from "../domain/interfaces/services/MedicalPractitionerService";

import { AppError } from "../domain/errors/AppError";

export class MedicalPractitionerServiceImpl implements MedicalPractitionerServiceService {
    constructor(
        private medicalPractitionerServiceRepository: MedicalPractitionerServiceRepository,
        private medicalPractitionerRepository: MedicalPractitionerRepository,
        private serviceRepository: ServiceRepository
    ) {}

    async getServicesByMedicalPractitionerId(medicalPractitionerId: number): Promise<MedicalPractitionerService[]> {
        // Check if medical practitioner exists
        const medicalPractitioner = await this.medicalPractitionerRepository.findById(medicalPractitionerId);
        if (!medicalPractitioner) {
            throw new AppError('Medical practitioner not found', 404);
        }

        return this.medicalPractitionerServiceRepository.findByMedicalPractitionerId(medicalPractitionerId);
    }

    async getMedicalPractitionersByServiceId(serviceId: number): Promise<MedicalPractitionerService[]> {
        // Check if service exists
        const service = await this.serviceRepository.findById(serviceId);
        if (!service) {
            throw new AppError('Service not found', 404);
        }

        return this.medicalPractitionerServiceRepository.findByServiceId(serviceId);
    }

    async assignServiceToMedicalPractitioner(medicalPractitionerId: number, serviceId: number): Promise<MedicalPractitionerService> {
        // Check if medical practitioner exists
        const medicalPractitioner = await this.medicalPractitionerRepository.findById(medicalPractitionerId);
        if (!medicalPractitioner) {
            throw new AppError('Medical practitioner not found', 404);
        }

        // Check if service exists
        const service = await this.serviceRepository.findById(serviceId);
        if (!service) {
            throw new AppError('Service not found', 404);
        }

        // Check if the relation already exists
        const exists = await this.medicalPractitionerServiceRepository.exists(medicalPractitionerId, serviceId);
        if (exists) {
            throw new AppError('Service already assigned to medical practitioner', 409);
        }

        return this.medicalPractitionerServiceRepository.create({
            medicalPractitionerId,
            serviceId
        });
    }

    async removeServiceFromMedicalPractitioner(medicalPractitionerId: number, serviceId: number): Promise<boolean> {
        // Check if medical practitioner exists
        const medicalPractitioner = await this.medicalPractitionerRepository.findById(medicalPractitionerId);
        if (!medicalPractitioner) {
            throw new AppError('Medical practitioner not found', 404);
        }

        // Check if service exists
        const service = await this.serviceRepository.findById(serviceId);
        if (!service) {
            throw new AppError('Service not found', 404);
        }

        // Check if the relation exists
        const exists = await this.medicalPractitionerServiceRepository.exists(medicalPractitionerId, serviceId);
        if (!exists) {
            throw new AppError('Service not assigned to medical practitioner', 404);
        }

        return this.medicalPractitionerServiceRepository.delete(medicalPractitionerId, serviceId);
    }
}