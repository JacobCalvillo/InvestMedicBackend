import Appointment from "../db/models/Appointment";


const createAppointment = async (data: any) => {
    
    const { patientId,doctorId, ...appointmentData } = data;

    try {
        const newAppointment = await Appointment.create({
            data: {
                ...appointmentData,
                patient: {
                    connect: { id: patientId },
                },
                doctor: {
                    connect: { id: doctorId },
                },
            }
        });

        return newAppointment;

    } catch (error) {
        console.error("Error al crear la cita:", error);
        return null;
    }
}

const getAppointments = async () => {
    try {
        const appointments = await Appointment.findAll();
        return appointments;
    } catch (error) {
        console.error("Error al obtener las citas:", error);
        return null;
    }
}

const getAppointmentsByPatientId = async (patientId: number) => {
    try {
        const appointments = await Appointment.findAll({
            where: { patientId: patientId }
        });
        return appointments;
    } catch (error) {
        console.error("Error al obtener las citas del paciente:", error);
        return null;
    }
}

export { createAppointment, getAppointments, getAppointmentsByPatientId };