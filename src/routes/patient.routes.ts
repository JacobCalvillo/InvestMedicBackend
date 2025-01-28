import { Router } from "express";
import { createPatientController, getPatientsController, getPatientController } from "../controllers/patientController";

const router = Router();

router.get('/patients', getPatientsController);
router.get('/patient/:id', getPatientController);

router.post('/patient', createPatientController);

export { router }