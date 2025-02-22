import { Request, Response } from "express";
import { createAppointment, getAppointments, getAppointmentsByPatientId } from "../services/appointmentService";

const createAppointmentController = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const appointment = await createAppointment(body);
        res.status(200).send(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAppointmentsController = async (_req: Request, res: Response) => {
    try {
        const appointments = await getAppointments();
        res.status(200).send(appointments);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAppointmentsByPatientIdController = async (req: Request, res: Response) => {
    try {
        const patientId = Number(req.params.id);
        const appointments = await getAppointmentsByPatientId(patientId);
        res.status(200).send(appointments);
    } catch (error) {
        res.status(500).send(error);
    }
}

export { createAppointmentController, getAppointmentsController, getAppointmentsByPatientIdController };