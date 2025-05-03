// src/api/controllers/StatusController.ts
import { Request, Response } from 'express';
import { StatusService } from '../../core/domain/interfaces/services/StatusService';
import { catchAsync } from '../middleware/error.middleware';
import { AppError } from '../../core/domain/errors/AppError';

export class StatusController {
    constructor(private statusService: StatusService) {}

    getStatuses = catchAsync(async (_req: Request, res: Response): Promise<void> => {
        const statuses = await this.statusService.getAllStatuses();
        res.status(200).json(statuses);
    });

    getStatusById = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const status = await this.statusService.getStatusById(id);

        if (!status) {
            throw new AppError('Status not found', 404);
        }

        res.status(200).json(status);
    });

    createStatus = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const { name } = req.body;
        
        if (!name) {
            throw new AppError('Name is required', 400);
        }

        const status = await this.statusService.createStatus(name);
        res.status(201).json(status);
    });
}