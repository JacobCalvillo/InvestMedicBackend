// src/api/routes/appointment.routes.ts
import {RequestHandler, Router} from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { validateAppointment } from '../validators/appointment.validator';

export function appointmentRoutes(appointmentController: AppointmentController, authenticate: RequestHandler): Router {
    const router = Router();

    // Get all appointments
    router.get('/appointments', authenticate, appointmentController.getAppointments);

    // Get appointment by ID
    router.get('/appointments/:id', authenticate, appointmentController.getAppointmentById);

    // Create new appointment
    router.post(
        '/appointments',
        authenticate,
        validateAppointment,
        appointmentController.createAppointment
    );

    // Update appointment
    router.put(
        '/appointments',
        authenticate,
        validateAppointment,
        appointmentController.updateAppointment
    );

    // Update appointment status
    router.put(
        '/appointments/:id/:statusId',
        authenticate,
        appointmentController.updateAppointmentStatus
    );

    return router;
}