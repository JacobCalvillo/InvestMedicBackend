import { Request, Response } from 'express';
import {
    getAppointments,
    createAppointment,
    updateAppointment,
    updateStatusAppointment
} from "../services/appointment.service";
import {handleHttp} from "../utils/error.handle";

export const getAppointmentsController = async (req: Request, res: Response) => {
    try {
        const appointments = await getAppointments();
        if (appointments) {
            res.status(200).send(appointments);
        } else {
            res.status(404).send(appointments);
        }
    } catch (error) {
        handleHttp(res,"ERR_GET_APPOINTMENTS", error);
    }
}

export const createAppointmentController = async (req: Request, res: Response) => {
    try {
        console.log("Controller:", req.body);
        const newAppointment = await createAppointment(req.body);
        console.log(newAppointment);
        if (newAppointment) {
            console.log(newAppointment);
            res.status(201).send(newAppointment);
        } else {
            res.status(404).send(newAppointment);
        }
    } catch (error) {
        handleHttp(res,"ERR_CREATE_APPOINTMENT", error);
    }
}

export const updateAppointmentController = async (req: Request, res: Response) => {
    try {

        const updatedAppointment = await updateAppointment(req.body);
        if(updatedAppointment) {
            res.status(200).send(updatedAppointment);
        } else {
            res.status(404).send(createAppointment);
        }
    } catch (error) {
        handleHttp(res,"ERR_UPDATE_APPOINTMENT", error);
    }
}

export const updateStatusAppointmentController = async (req: Request, res: Response) => {
    try {
        const { id, statusId } = req.params;
        const updateStatus = await updateStatusAppointment(Number(id), Number(statusId));
        if (updateStatus) {
            res.status(200).send(updateStatus);
        } else {
            res.status(404).send(createAppointment);
        }
    } catch (error) {
        handleHttp(res,"ERR_UPDATE_APPOINTMENT", error);
    }
}