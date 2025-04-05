import {
    getServices,
    getServiceById,
    createService,
    stripeSession
} from "../../core/services/service.service";
import {Request, Response} from "express";
import {handleHttp} from "../../core/utils/error.handle";

export const stripeSessionController = async (req: Request, res: Response) => {
    try {

        const session = req.body;

        const sessionStripe = await stripeSession(
            Number(session.serviceId),
            session.customerEmail,
            Number(session.quantity),
            Number(session.appointmentId)
        );

        if(session){
            res.status(200).send(sessionStripe);
        } else {
            res.status(404).send(sessionStripe);
        }
    } catch (error) {
        handleHttp(res, "ERR_STRIPE_SESSION", error);
    }
}

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

export const createServiceController = async(req: Request, res: Response) => {
    try {
        const service = req.body;
        const newService = await createService(service);
        if (newService) {
            res.status(201).send(newService);
        } else {
            res.status(400).send(newService);
        }
    } catch (error) {
        handleHttp(res, "ERR_CREATE_SERVICE", error);
    }
}