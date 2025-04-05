// src/api/controllers/AppointmentController.ts
import { Request, Response } from 'express';
import { AppointmentService } from '../../core/services/appointment.service';
import { catchAsync} from "../middleware/error.middleware";
import { AppError } from '../../core/domain/errors/AppError';

export class AppointmentController {
    constructor(private appointmentService: AppointmentService) {}

    getAppointments = async (_req: Request, res: Response): Promise<void> => {
        try {
            const appointments = await this.appointmentService.getAllAppointments();
            res.status(200).json(appointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            res.status(500).json({ message: 'Failed to retrieve appointments' });
        }
    };

    getAppointmentById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const appointment = await this.appointmentService.getAppointmentById(id);

            if (!appointment) {
                res.status(404).json({ message: 'Appointment not found' });
                return;
            }

            res.status(200).json(appointment);
        } catch (error) {
            console.error('Error fetching appointment:', error);
            res.status(500).json({ message: 'Failed to retrieve appointment' });
        }
    };

    createAppointment = async (req: Request, res: Response): Promise<void> => {
        try {
            const appointmentData = req.body;
            const appointment = await this.appointmentService.createAppointment(appointmentData);
            res.status(201).json(appointment);
        } catch (error) {
            console.error('Error creating appointment:', error);
            res.status(500).json({ message: 'Failed to create appointment' });
        }
    };

    updateAppointment = async (req: Request, res: Response): Promise<void> => {
        try {
            const appointmentData = req.body;
            const appointment = await this.appointmentService.updateAppointment(appointmentData);

            if (!appointment) {
                res.status(404).json({ message: 'Appointment not found' });
                return;
            }

            res.status(200).json(appointment);
        } catch (error) {
            console.error('Error updating appointment:', error);
            res.status(500).json({ message: 'Failed to update appointment' });
        }
    };

    updateAppointmentStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const statusId = parseInt(req.params.statusId);

            const appointment = await this.appointmentService.updateAppointmentStatus(id, statusId);

            if (!appointment) {
                res.status(404).json({ message: 'Appointment not found' });
                return;
            }

            res.status(200).json(appointment);
        } catch (error) {
            console.error('Error updating appointment status:', error);
            res.status(500).json({ message: 'Failed to update appointment status' });
        }
    };
}