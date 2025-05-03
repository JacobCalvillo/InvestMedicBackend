import { Appointment } from '../domain/entities/Appointment';
import { AppointmentRepository } from '../domain/interfaces/repositories/AppointmentRepository';
import {NotificationService} from "../domain/interfaces/services/NotificationService";

export class AppointmentService {
    constructor(
        private appointmentRepository: AppointmentRepository,
        private notificationService: NotificationService
    ) {}

    async getAllAppointments(): Promise<Appointment[]> {
        return this.appointmentRepository.findAll();
    }

    async getAppointmentById(id: number): Promise<Appointment | null> {
        return this.appointmentRepository.findById(id);
    }

    async getPatientAppointments(patientId: number): Promise<Appointment[]> {
        return this.appointmentRepository.findByPatientId(patientId);
    }

    async createAppointment(appointmentData: Appointment): Promise<Appointment> {
        // You can add business validation here
        const appointment = await this.appointmentRepository.create(appointmentData);

        // Business logic after creation - send notification
        await this.notificationService.sendAppointmentConfirmation(appointment);

        return appointment;
    }

    async updateAppointment(appointmentData: Appointment): Promise<Appointment | null> {
        return this.appointmentRepository.update(appointmentData);
    }

    async updateAppointmentStatus(id: number, statusId: number): Promise<Appointment | null> {
        const appointment = await this.appointmentRepository.updateStatus(id, statusId);

        if (appointment) {
            // Different notifications based on status
            if (statusId === 2) { // Assuming 2 is "Confirmed"
                await this.notificationService.sendAppointmentConfirmation(appointment);
            } else if (statusId === 3) { // Assuming 3 is "Cancelled"
                await this.notificationService.sendAppointmentCancellation(appointment);
            }
        }

        return appointment;
    }
}