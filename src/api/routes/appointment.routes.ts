// src/api/routes/appointments.routes.ts
import {RequestHandler, Router} from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { validateAppointment } from '../validators/appointment.validator';

export function appointmentRoutes(appointmentController: AppointmentController, authenticate: RequestHandler): Router {
    const router = Router();

    // Get all appointments
    router.get('/appointments', authenticate, appointmentController.getAppointments);

    // Get appointments by ID
    router.get('/appointments/:id', authenticate, appointmentController.getAppointmentById);

    // Create new appointments
    router.post(
        '/appointments',
        authenticate,
        validateAppointment,
        appointmentController.createAppointment
    );

    // Update appointments
    router.put(
        '/appointments',
        authenticate,
        validateAppointment,
        appointmentController.updateAppointment
    );

    // Update appointments status
    router.put(
        '/appointments/:id/:statusId',
        authenticate,
        appointmentController.updateAppointmentStatus
    );

    return router;
}