import { getServices, getServiceById } from "../services/service.service";
import {Request, Response} from "express";
import {handleHttp} from "../utils/error.handle";

export const getServicesController = async (req: Request, res: Response) => {
    try {
        const services = await getServices();
        if(services){
            res.status(200).send(services);
        } else {
            res.status(404).send(services);
        }
    } catch (error) {
        handleHttp(res, "ERR_GET_SERVICES", error);
    }
}

export const getServiceByIdController = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await getServiceById(Number(id));
        if( service) {
            res.status(200).send(service);
        } else {
            res.status(404).send(service);
        }
    } catch (error) {
        handleHttp(res, "ERR_GET_SERVICE", error);
    }
}