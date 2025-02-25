import {createStatus, getStatus, getStatuses} from "../services/status.service";
import { Request, Response } from "express";
import {handleHttp} from "../utils/error.handle";

export const getStatusesController = async(req: Request, res: Response) => {
    try {
        const statuses = await  getStatuses();
        if(statuses) {
            res.status(200).send(statuses);
        } else {
            res.status(404).send(statuses);
        }
    } catch (error) {
        handleHttp(res, "ERR_GET_STATUSES",error);
    }
}

export const getStatusController = async(req: Request, res: Response) => {
    try {
        const status = await getStatus(Number(req.params.id));
        if(status) {
            res.status(200).send(status);
        } else {
            res.status(404).send(status);
        }
    } catch (er) {
        console.log(er);
        handleHttp(res, "ERR_GET_STATUS");
    }
}

export const createStatusController = async(req: Request, res: Response) => {
    try {
        const status = await createStatus(req.body.name);
        console.log(status);
        if(status) {
            res.status(201).send();
        } else {
            res.status(400).send(status);
        }
    } catch (error) {
        handleHttp(res, "ERR_CREATE_STATUS",error);
    }
}