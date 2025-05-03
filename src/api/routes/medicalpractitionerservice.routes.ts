// src/api/routes/medicalPractitionerService.routes.ts
import { Router } from 'express';
import { MedicalPractitionerServiceController } from '../controllers/medicalpractitionerservice.controller';
import { RequestHandler } from 'express';

export function medicalPractitionerServiceRoutes(
    medicalPractitionerServiceController: MedicalPractitionerServiceController, 
    authenticate: RequestHandler
): Router {
    const router = Router();

    // Get services by medical practitioner ID
    router.get(
        '/medical-practitioners/:id/services',
        medicalPractitionerServiceController.getServicesByMedicalPractitionerId
    );

    // Get medical practitioners by service ID
    router.get(
        '/services/:id/medical-practitioners',
        medicalPractitionerServiceController.getMedicalPractitionersByServiceId
    );

    // Assign service to medical practitioner
    router.post(
        '/medical-practitioners/:medicalPractitionerId/services/:serviceId',
        authenticate,
        medicalPractitionerServiceController.assignServiceToMedicalPractitioner
    );

    // Remove service from medical practitioner
    router.delete(
        '/medical-practitioners/:medicalPractitionerId/services/:serviceId',
        authenticate,
        medicalPractitionerServiceController.removeServiceFromMedicalPractitioner
    );

    return router;
}