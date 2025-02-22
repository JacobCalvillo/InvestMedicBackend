import { Router } from 'express';
import { getAllMedicalPractitionersController } from "../controllers/medicalpractitioner.controller";

const router = Router();

//GET
router.get('/medicalpractitioners', getAllMedicalPractitionersController);

export { router };