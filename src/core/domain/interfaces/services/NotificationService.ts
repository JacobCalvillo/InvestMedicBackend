import { Appointment } from '../../entities/Appointment';

export interface NotificationService {
    sendAppointmentConfirmation(appointment: Appointment): Promise<boolean>;
    sendAppointmentCancellation(appointment: Appointment): Promise<boolean>;
    sendAppointmentReminder(appointment: Appointment): Promise<boolean>;
}