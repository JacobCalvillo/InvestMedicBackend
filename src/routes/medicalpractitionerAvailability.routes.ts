import { Router } from 'express';
import {
    getMedicalPractitionerAvailabilityController,
    getMedicalPractitionerAvailabilityById,
} from "../controllers/medicalpractitionerAvailability.controller";


const router = Router();

//GET
router.get('/medicalpractitionerAvailability',getMedicalPractitionerAvailabilityController);
router.get('/medicalpractitioner/:id/availability',getMedicalPractitionerAvailabilityById);


export { router };