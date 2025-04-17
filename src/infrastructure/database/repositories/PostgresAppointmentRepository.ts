import { Appointment } from '../../../core/domain/entities/Appointment';
import { AppointmentRepository } from '../../../core/domain/interfaces/repositories/AppointmentRepository';
import { Pool } from 'pg';

export class PostgresAppointmentRepository implements AppointmentRepository {
    constructor(private db: Pool) {}

    async findAll(): Promise<Appointment[]> {
        const result = await this.db.query('SELECT * FROM Appointment');
        return result.rows;
    }

    async findById(id: number): Promise<Appointment | null> {
        const result = await this.db.query('SELECT * FROM Appointment WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async findByPatientId(patientId: number): Promise<Appointment[]> {
        const result = await this.db.query('SELECT * FROM Appointment WHERE patient_id = $1', [patientId]);
        return result.rows;
    }

    async create(data: Appointment): Promise<Appointment> {
        const result = await this.db.query(`
      INSERT INTO Appointment (
        start_time, end_time, reason, status_id, patient_id, medical_practitioner_id, service_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                data.startTime,
                data.endTime || null,
                data.reason,
                data.statusId,
                data.patientId,
                data.medicalPractitionerId,
                data.serviceId
            ]
        );
        return result.rows[0];
    }

    async update(data: Appointment): Promise<Appointment | null> {
        if (!data.id) return null;

        const result = await this.db.query(`
      UPDATE Appointment SET
        start_time = $1,
        end_time = $2,
        reason = $3,
        status_id = $4,
        patient_id = $5,
        medical_practitioner_id = $6,
        service_id = $7
      WHERE id = $8 RETURNING *`,
            [
                data.startTime,
                data.endTime || null,
                data.reason,
                data.statusId,
                data.patientId,
                data.medicalPractitionerId,
                data.serviceId,
                data.id
            ]
        );
        return result.rows[0] || null;
    }

    async updateStatus(id: number, statusId: number): Promise<Appointment | null> {
        const result = await this.db.query(`
      UPDATE Appointment SET status_id = $1 WHERE id = $2 RETURNING *`,
            [statusId, id]
        );
        return result.rows[0] || null;
    }
}