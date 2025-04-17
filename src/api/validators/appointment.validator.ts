import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Define the validation schema for appointments
const appointmentSchema = z.object({
    startTime: z.coerce.date(),
    endTime: z.coerce.date().optional(),
    reason: z.string().optional(),
    statusId: z.number(),
    patientId: z.number(),
    medicalPractitionerId: z.number(),
    serviceId: z.number(),
});

export const validateAppointment = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate the request body
        appointmentSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Return validation errors in a formatted way
            res.status(400).json({
                message: 'Validation failed',
                errors: error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message
                }))
            });
        }

        // Handle unexpected errors
        console.error('Validation error:', error);
        res.status(500).json({ message: 'Internal server error during validation' });
        return;
    }
};