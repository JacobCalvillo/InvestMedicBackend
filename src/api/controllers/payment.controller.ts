// src/api/controllers/PaymentController.ts
import { Request, Response } from 'express';
import { PaymentService } from '../../core/domain/interfaces/services/PaymentService';
import { catchAsync } from '../middleware/error.middleware';
import { AppError } from '../../core/domain/errors/AppError';

export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    getPayments = catchAsync(async (_req: Request, res: Response): Promise<void> => {
        const payments = await this.paymentService.getAllPayments();
        res.status(200).json(payments);
    });

    getPaymentById = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const payment = await this.paymentService.getPaymentById(id);

        if (!payment) {
            throw new AppError('Payment not found', 404);
        }

        res.status(200).json(payment);
    });

    getPaymentsByPatientId = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const patientId = parseInt(req.params.id);
        const payments = await this.paymentService.getPaymentsByPatientId(patientId);
        res.status(200).json(payments);
    });

    createPayment = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const payment = await this.paymentService.createPayment(req.body);
        res.status(201).json(payment);
    });

    updatePayment = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const payment = await this.paymentService.updatePayment({
            id,
            ...req.body
        });

        if (!payment) {
            throw new AppError('Payment not found', 404);
        }
        res.status(200).json(payment);
    });

    deletePayment = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const deleted = await this.paymentService.deletePayment(id);

        if (!deleted) {
            throw new AppError('Payment not found', 404);
        }

        res.status(204).send();
    });
}