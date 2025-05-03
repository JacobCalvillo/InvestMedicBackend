// src/api/validators/paymentMethod.validator.ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../../core/domain/errors/AppError';

const paymentMethodSchema = z.object({
    name: z.string().min(1, "Name is required")
});

export const validatePaymentMethod = (req: Request, res: Response, next: NextFunction): void => {
    try {
        paymentMethodSchema.parse(req.body);
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