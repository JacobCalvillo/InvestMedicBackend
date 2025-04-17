// src/api/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../core/domain/errors/AppError';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {  // Añadir tipo de retorno explícito
    console.error('Error:', err);

    // If it's our AppError with status code and message
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
        return;  // Solo retornar, sin devolver el resultado de res.json()
    }

    // For unknown errors, return a generic error message
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
    });
    return;  // Solo retornar, sin devolver el resultado de res.json()
};

// Helper function to handle async errors in route handlers
export const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};