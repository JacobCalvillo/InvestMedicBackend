import { Request, Response } from "express";
import { createService, getServices, getServiceByName, getServiceById } from "../services/servicesService";

export const createServiceController = async (req: Request, res: Response) => {
    try {
        const params = req.body;
        const service = await createService(params);
        res.status(201).send(service);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const getServicesController = async (_req: Request, res: Response) => {
    try {
        const services = await getServices();
        res.status(200).send(services);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const getServiceByNameController = async (req: Request, res: Response) => {
    try {
        const name = req.params.name;
        const decodedName = decodeURIComponent(name);
        const service = await getServiceByName(decodedName);
        console.log(service);   
        res.status(200).send(service);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const getServiceByIdController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log(`aqui estoy ${id}`);
        const service = await getServiceById(Number(id));
        console.log(service);   
        res.status(200).send(service);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};