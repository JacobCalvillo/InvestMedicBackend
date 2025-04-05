import { Request, Response } from "express";
import { handleHttp } from "../../core/utils/error.handle";
import { getPaymentMethods } from "../../core/services/paymentmethod.service";

export const getPaymentMethodsController = async (_req: Request, res: Response) => {
    try {
        const paymentMethods = await getPaymentMethods();
        if (paymentMethods) {
            res.status(200).send(paymentMethods);
        } else {
            res.status(400).send(paymentMethods);
        }
    } catch (error) {
        handleHttp(res, "ERR_GET_PAYMENT_METHODS",error);
    }
}