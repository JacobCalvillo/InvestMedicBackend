// src/api/validators/payment.validator.ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../../core/domain/errors/AppError';

const paymentSchema = z.object({
    stripePaymentId: z.string().optional(),
    amount: z.number().min(0, "Amount must be non-negative"),
    currency: z.string().min(1, "Currency is required"),
    paymentMethodId: z.number().int("Payment method ID must be an integer"),
    patientId: z.number().int("Patient ID must be an integer"),
    invoiceId: z.number().int("Invoice ID must be an integer").optional()
});

export const validatePayment = (req: Request, res: Response, next: NextFunction): void => {
    try {
        paymentSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const formattedErrors = error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));

            next(new AppError(`Validation error: ${JSON.stringify(formattedErrors)}`, 400));
            return;
        }
        next(error);
    }
};