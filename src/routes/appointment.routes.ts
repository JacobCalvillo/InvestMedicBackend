import {
    getAppointmentsController,
    createAppointmentController,
    updateAppointmentController,
    updateStatusAppointmentController
} from '../controllers/appointment.controller'

import { Router } from "express";

const router = Router();

//GET
router.get("/appointments", getAppointmentsController);

//POST
router.post("/appointment",createAppointmentController);

//PUT
router.put("/appointment", updateAppointmentController);
router.put("/appointment/:id/:statusId", updateStatusAppointmentController);


export { router };