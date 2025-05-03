// src/api/controllers/FileController.ts
import { Request, Response } from 'express';
import { FileService } from '../../core/domain/interfaces/services/FileService';
import { catchAsync } from '../middleware/error.middleware';
import { AppError } from '../../core/domain/errors/AppError';

export class FileController {
    constructor(private fileService: FileService) {}

    uploadFile = catchAsync(async (req: Request, res: Response): Promise<void> => {
        if (!req.file) {
            throw new AppError('No file uploaded', 400);
        }

        const userId = parseInt(req.params.id);
        const folder = req.query.folder as string || 'default';

        const fileUrl = await this.fileService.uploadFile(req.file, userId, folder);
        
        res.status(200).json({
            success: true,
            data: {
                url: fileUrl,
                fileName: req.file.originalname
            }
        });
    });

    getFileUrl = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const userId = parseInt(req.params.id);
        const fileName = req.query.name as string;
        const folder = req.query.folder as string || 'default';

        if (!fileName) {
            throw new AppError('File name is required', 400);
        }

        const fileUrl = await this.fileService.getFileUrl(userId, fileName, folder);
        
        res.status(200).json({
            success: true,
            data: {
                url: fileUrl,
                fileName
            }
        });
    });

    deleteFile = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const userId = parseInt(req.params.id);
        const fileName = req.query.name as string;
        const folder = req.query.folder as string || 'default';

        if (!fileName) {
            throw new AppError('File name is required', 400);
        }

        const success = await this.fileService.deleteFile(userId, fileName, folder);
        
        if (success) {
            res.status(200).json({
                success: true,
                message: 'File deleted successfully'
            });
        } else {
            throw new AppError('Failed to delete file', 500);
        }
    });
}