import { getIdentificationsType } from "../../core/services/identificationType.service";
import { Request, Response } from "express";
import {handleHttp} from "../../core/utils/error.handle";

export const getIdentificationTypesController = async (_req: Request, res: Response) => {
    try {
        const identificationTypes = await getIdentificationsType();
        if(identificationTypes) {
            res.status(200).send(identificationTypes);
        } else {
            res.status(400).send({ message: 'No hay identificaciones registradas' });
        }
    } catch (error) {
        handleHttp(res, 'ERROR_GET_IDENTIFICATION_TYPES', error);
    }
}
