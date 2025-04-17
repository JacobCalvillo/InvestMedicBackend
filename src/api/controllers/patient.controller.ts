import { Request, Response } from "express";
import { getAllPatients, getPatientById, createPatientWithIdentification } from "../../core/services/patient.service";
import { handleHttp } from "../../core/utils/error.handle";

export const getAllPatientsController = async(_req: Request, res: Response) => {
    try {
        const patients = await getAllPatients();
        if (!patients) {
            res.status(404).send({ message: patients });
        }
        res.status(200).send(patients);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_PATIENTS', error)
    }
};

export const getPatientByIdController = async(req: Request, res:Response) => {
    try {
        const id = req.params.id;
        const patient = await getPatientById(Number(id));
        if (!patient) {
            res.status(404).send({ message: patient });
        }
        res.status(200).send(patient);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_PATIENT', error)
    }
}

export const createPatientController = async (req: Request, res:Response) => {
    try {
        const patient = req.body;
        console.log(patient);
        const { identificationTypeId } = req.query;
        const newPatient = await createPatientWithIdentification(patient, req.query.identificationNumber,
            Number(identificationTypeId), req.query.identificationUrl)
        if (newPatient) {
            res.status(201).send(newPatient);
        } else {
            res.status(400).send(patient);
        }
    } catch (error) {
        handleHttp(res, 'ERROR_CREATE_PATIENT', error);
    }
}

