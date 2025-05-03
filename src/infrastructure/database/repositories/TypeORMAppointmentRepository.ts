
import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db/typeORM.config";
import { AppointmentEntity } from "../entities/appointment.entity";
import { Appointment } from "../../../core/domain/entities/Appointment";
import { AppointmentRepository } from "../../../core/domain/interfaces/repositories/AppointmentRepository";

export class TypeORMAppointmentRepository implements AppointmentRepository {
    private repository: Repository<AppointmentEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(AppointmentEntity);
    }

    async findAll(): Promise<Appointment[]> {
        return this.repository.find({
            relations: ['patient', 'medicalPractitioner', 'service', 'status']
        });
    }

    async findById(id: number): Promise<Appointment | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['patient', 'medicalPractitioner', 'service', 'status']
        });
    }

    async findByPatientId(patientId: number): Promise<Appointment[]> {
        return this.repository.find({
            where: { patientId },
            relations: ['medicalPractitioner', 'service', 'status'],
            order: { startTime: 'DESC' }
        });
    }

    async create(data: Appointment): Promise<Appointment> {
        const appointment = this.repository.create({
            startTime: data.startTime,
            endTime: data.endTime || new Date(new Date(data.startTime).getTime() + 30 * 60000), // Default to 30 min
            reason: data.reason,
            statusId: data.statusId,
            patientId: data.patientId,
            medicalPractitionerId: data.medicalPractitionerId,
            serviceId: data.serviceId
        });

        return this.repository.save(appointment);
    }

    async update(data: Appointment): Promise<Appointment | null> {
        if (!data.id) return null;

        const appointment = await this.repository.findOne({ where: { id: data.id }});
        if (!appointment) return null;

        // Update appointment fields
        Object.assign(appointment, {
            startTime: data.startTime,
            endTime: data.endTime,
            reason: data.reason,
            statusId: data.statusId,
            patientId: data.patientId,
            medicalPractitionerId: data.medicalPractitionerId,
            serviceId: data.serviceId
        });

        return this.repository.save(appointment);
    }

    async updateStatus(id: number, statusId: number): Promise<Appointment | null> {
        const appointment = await this.repository.findOne({ where: { id }});
        if (!appointment) return null;

        appointment.statusId = statusId;
        return this.repository.save(appointment);
    }
}