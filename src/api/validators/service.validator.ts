// src/api/validators/service.validator.ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../../core/domain/errors/AppError';

const serviceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.number().min(0, "Price must be non-negative"),
    imageUrl: z.string().optional(),
    stripePriceId: z.string().optional(),
    stripeProductId: z.string().optional()
});

const checkoutSessionSchema = z.object({
    serviceId: z.number().int("Service ID must be an integer"),
    customerEmail: z.string().email("Valid email is required"),
    quantity: z.number().int("Quantity must be an integer").min(1, "Quantity must be at least 1").optional(),
    appointmentId: z.number().int("Appointment ID must be an integer").optional()
});

export const validateService = (req: Request, res: Response, next: NextFunction): void => {
    try {
        serviceSchema.parse(req.body);
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

export const validateCheckoutSession = (req: Request, res: Response, next: NextFunction): void => {
    try {
        checkoutSessionSchema.parse(req.body);
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