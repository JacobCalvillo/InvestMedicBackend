import { Request, Response } from "express";
import { createPatient, getPatients, getPatient } from "../services/patientService";

const createPatientController = async(req: Request, res: Response) => {
    try {
        const body = req.body.patient;
        const patient = await createPatient(body);
        console.log(patient);
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getPatientsController = async(_req: Request, res: Response) => {
    try {
        const patients = await getPatients();
        res.status(200).send(patients);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getPatientController = async(req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const patient = await getPatient(id);
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
};

export { createPatientController, getPatientsController, getPatientController }