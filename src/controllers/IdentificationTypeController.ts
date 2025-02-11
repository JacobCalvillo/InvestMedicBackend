import {
    createIdentificationType,
    getIdentificationTypes
} from "../services/identificationTypeService";
import { Request, Response } from "express";

export const createIdentificationTypeController = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const identificationType = await createIdentificationType(body);
        res.status(200).send(identificationType);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export const getIdentificationTypesController = async (_req: Request, res: Response) => {
    try {
        const identificationTypes = await getIdentificationTypes();
        res.status(200).send(identificationTypes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
