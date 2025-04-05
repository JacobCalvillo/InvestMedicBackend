// src/api/validators/user.validator.ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../../core/domain/errors/AppError';

// Esquema para validar la creación de usuario
const createUserSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters").max(50),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().regex(/^\+\d{10,15}$/, "Phone number is not valid"),
    profilePictureUrl: z.string().url().optional(),
});

// Esquema para validar el inicio de sesión
const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
});

// Esquema para validar la actualización de usuario
const updateUserSchema = createUserSchema.partial().merge(
    z.object({
        id: z.number(),
    })
);

export const validateCreateUser = (req: Request, res: Response, next: NextFunction): void => {
    try {
        createUserSchema.parse(req.body);
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

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction): void => {
    try {
        updateUserSchema.parse(req.body);
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

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    try {
        loginSchema.parse(req.body);
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