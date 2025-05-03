// src/api/controllers/MedicalPractitionerServiceController.ts
import { Request, Response } from 'express';
import { MedicalPractitionerServiceService } from '../../core/domain/interfaces/services/MedicalPractitionerService';
import { catchAsync } from '../middleware/error.middleware';
import { AppError } from '../../core/domain/errors/AppError';

export class MedicalPractitionerServiceController {
    constructor(private medicalPractitionerServiceService: MedicalPractitionerServiceService) {}

    getServicesByMedicalPractitionerId = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const medicalPractitionerId = parseInt(req.params.id);
        const services = await this.medicalPractitionerServiceService.getServicesByMedicalPractitionerId(medicalPractitionerId);
        res.status(200).json(services);
    });

    getMedicalPractitionersByServiceId = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const serviceId = parseInt(req.params.id);
        const medicalPractitioners = await this.medicalPractitionerServiceService.getMedicalPractitionersByServiceId(serviceId);
        res.status(200).json(medicalPractitioners);
    });

    assignServiceToMedicalPractitioner = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const medicalPractitionerId = parseInt(req.params.medicalPractitionerId);
        const serviceId = parseInt(req.params.serviceId);
        
        const relation = await this.medicalPractitionerServiceService.assignServiceToMedicalPractitioner(
            medicalPractitionerId,
            serviceId
        );
        
        res.status(201).json(relation);
    });

    removeServiceFromMedicalPractitioner = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const medicalPractitionerId = parseInt(req.params.medicalPractitionerId);
        const serviceId = parseInt(req.params.serviceId);
        
        const deleted = await this.medicalPractitionerServiceService.removeServiceFromMedicalPractitioner(
            medicalPractitionerId,
            serviceId
        );
        
        if (!deleted) {
            throw new AppError('Failed to remove service from medical practitioner', 500);
        }
        
        res.status(204).send();
    });
}