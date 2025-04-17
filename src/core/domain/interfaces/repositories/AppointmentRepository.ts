import { Appointment } from '../../entities/Appointment';

export interface AppointmentRepository {
    findAll(): Promise<Appointment[]>;
    findById(id: number): Promise<Appointment | null>;
    findByPatientId(patientId: number): Promise<Appointment[]>;
    create(data: Appointment): Promise<Appointment>;
    update(data: Appointment): Promise<Appointment | null>;
    updateStatus(id: number, statusId: number): Promise<Appointment | null>;
}