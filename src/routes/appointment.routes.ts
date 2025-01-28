import { Router } from "express";
import { createAppointmentController, getAppointmentsController, getAppointmentsByPatientIdController } from "../controllers/appointmentController";

const router = Router();

router.post('/appointment', createAppointmentController);

router.get('/appointments', getAppointmentsController);
router.get('/appointments/:id', getAppointmentsByPatientIdController);

export { router };
