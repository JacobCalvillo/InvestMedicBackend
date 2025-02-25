import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { getPayments } from "../services/payment.service";

export const getPaymentsController = async (_req: Request, res: Response) => {
    try {
        const payments = getPayments();
        if (payments) {
            res.status(200).send(payments);
        } else {
            res.status(404).send(payments);
        }
    } catch (error) {
        handleHttp(res, "ERR_GET_PAYMENTS", error);
    }
}