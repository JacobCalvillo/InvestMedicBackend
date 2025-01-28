import { getPayments, createPayment } from "../services/paymentService";
import { Request, Response } from "express";

export const getPaymentsController = async(_req: Request, res: Response) => {
    try {
        const payments = await getPayments();
        res.status(200).send(payments);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

//testear esto para que pueda almacenar datos
export const createPaymentController = async(req: Request, res: Response) => {
    try {
        const { id, amount, currency, status, payment_method} = req.body;
        const payment = await createPayment({id, amount, currency, status, payment_method});
        
        res.status(200).send(payment);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}