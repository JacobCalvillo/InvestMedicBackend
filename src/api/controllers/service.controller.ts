import { Request, Response } from 'express';
import { ServiceService } from '../../core/domain/interfaces/services/ServiceService';
import { catchAsync } from '../middleware/error.middleware';
import { AppError } from '../../core/domain/errors/AppError';

export class ServiceController {
    constructor(private serviceService: ServiceService) {}

    getServices = catchAsync(async (_req: Request, res: Response): Promise<void> => {
        const services = await this.serviceService.getAllServices();
        res.status(200).json(services);
    });

    getServiceById = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const service = await this.serviceService.getServiceById(id);

        if (!service) {
            throw new AppError('Service not found', 404);
        }

        res.status(200).json(service);
    });

    createService = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const service = await this.serviceService.createService(req.body);
        res.status(201).json(service);
    });

    updateService = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const service = await this.serviceService.updateService({
            id,
            ...req.body
        });

        if (!service) {
            throw new AppError('Service not found', 404);
        }

        res.status(200).json(service);
    });

    deleteService = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const deleted = await this.serviceService.deleteService(id);

        if (!deleted) {
            throw new AppError('Service not found', 404);
        }

        res.status(204).send();
    });

    createCheckoutSession = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const { serviceId, customerEmail, quantity, appointmentId } = req.body;
        
        if (!serviceId || !customerEmail) {
            throw new AppError('Service ID and customer email are required', 400);
        }

        const sessionUrl = await this.serviceService.createCheckoutSession(
            serviceId,
            customerEmail,
            quantity || 1,
            appointmentId
        );

        if (!sessionUrl) {
            throw new AppError('Failed to create checkout session', 500);
        }

        res.status(200).json({ url: sessionUrl });
    });
}