import client from '../db/db-config/connect.db'
import { Appointment } from "../db/models/Appointment";
import { formatDateForDB } from "../utils/util.handle";

export const getAppointments = async (): Promise<Appointment[] | null> => {
    try{
        const appointments = await client.query("SELECT * FROM Appointment");
        return appointments.rows[0] || null
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createAppointment = async(data: Appointment): Promise<Appointment | null> => {
    try {
        console.log(data)

        const newAppointment = await client.query(`
                    INSERT INTO Appointment (
                        start_time,
                        end_time,
                        reason,
                        status_id,
                        patient_id,
                        medical_practitioner_id,
                        service_id
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                data.startTime,
                data.endTime || null,
                data.reason,
                data.statusId,
                data.patientId,
                data.medicalPractitionerId,
                data.serviceId
            ]);

        console.log(newAppointment.rows[0]); // 🔍 Verifica si devuelve un objeto válido
        return newAppointment.rows[0] || null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateAppointment = async(data: Appointment): Promise<Appointment | null> => {
    try {
        const updateAppointment = await client.query(`
                        UPDATE Appointment 
                        SET start_time = $1,
                            end_time = $2,
                            reason = $3,
                            status_id = $4,
                            patient_id = $5,
                            medical_practitioner_id = $6,
                            service_id = $7
                            
                            WHERE id = $8;`,

            [
                data.startTime,
                data.endTime,
                data.reason,
                data.statusId,
                data.patientId,
                data.medicalPractitionerId,
                data.serviceId,
                data.id
            ]
        )
        return updateAppointment.rows[0] || null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateStatusAppointment =
        async(statusId:number, id:number) : Promise<Appointment | null> => {
    try {
        const updateStatus = await client.query(`
                UPDATE Appointment
                SET status_id = $1
                WHERE id = $2`,
            [
                statusId,
                id
            ]
        )
        return updateStatus.rows[0] || null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
