import { Request, Response } from "express";
import { createIdentification, 
        deleteIdentification, 
        getIdentificationById, 
        getIdentifications, 
        updateIdentification } from "../services/identificationService";

export const createIdentificationController = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const identification = await createIdentification(body);
        res.status(200).send(identification);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export const getIdentificationsController = async (_req: Request, res: Response) => {
    try {
        const identifications = await getIdentifications();
        res.status(200).send(identifications);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export const getIdentificationByIdController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const identification = await getIdentificationById(Number(id));
        res.status(200).send(identification);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export const updateIdentificationController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const identification = await updateIdentification(Number(id), body);
        res.status(200).send(identification);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}   

export const deleteIdentificationController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const identification = await deleteIdentification(Number(id));
        res.status(200).send(identification);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }   
}