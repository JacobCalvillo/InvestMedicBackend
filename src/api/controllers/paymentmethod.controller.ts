// src/api/controllers/PaymentMethodController.ts
import { Request, Response } from 'express';
import { PaymentMethodService } from '../../core/domain/interfaces/services/PaymentMethodService';
import { catchAsync } from '../middleware/error.middleware';
import { AppError } from '../../core/domain/errors/AppError';

export class PaymentMethodController {
    constructor(private paymentMethodService: PaymentMethodService) {}

    getPaymentMethods = catchAsync(async (_req: Request, res: Response): Promise<void> => {
        const paymentMethods = await this.paymentMethodService.getAllPaymentMethods();
        res.status(200).json(paymentMethods);
    });

    getPaymentMethodById = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const paymentMethod = await this.paymentMethodService.getPaymentMethodById(id);

        if (!paymentMethod) {
            throw new AppError('Payment method not found', 404);
        }

        res.status(200).json(paymentMethod);
    });

    createPaymentMethod = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const { name } = req.body;
        
        if (!name) {
            throw new AppError('Name is required', 400);
        }

        const paymentMethod = await this.paymentMethodService.createPaymentMethod(name);
        res.status(201).json(paymentMethod);
    });

    updatePaymentMethod = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        
        if (!name) {
            throw new AppError('Name is required', 400);
        }

        const paymentMethod = await this.paymentMethodService.updatePaymentMethod(id, name);

        if (!paymentMethod) {
            throw new AppError('Payment method not found', 404);
        }

        res.status(200).json(paymentMethod);
    });

    deletePaymentMethod = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const deleted = await this.paymentMethodService.deletePaymentMethod(id);

        if (!deleted) {
            throw new AppError('Payment method not found', 404);
        }

        res.status(204).send();
    });
}