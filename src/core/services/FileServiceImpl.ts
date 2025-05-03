// src/core/services/FileServiceImpl.ts
import { FileService } from "../domain/interfaces/services/FileService";
import { S3Service } from "../domain/interfaces/services/S3Service";
import { AppError } from "../domain/errors/AppError";

export class FileServiceImpl implements FileService {
    constructor(private s3Service: S3Service) {}

    async uploadFile(file: Express.Multer.File, userId: number, folder: string): Promise<string> {
        if (!file) {
            throw new AppError('No file provided', 400);
        }

        try {
            const fileUrl = await this.s3Service.uploadFile(file, folder, userId);
            return fileUrl;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new AppError('Failed to upload file', 500);
        }
    }

    async getFileUrl(userId: number, fileName: string, folder: string): Promise<string> {
        try {
            const fileUrl = await this.s3Service.getFileUrl(userId, fileName, folder);
            return fileUrl;
        } catch (error) {
            console.error('Error getting file URL:', error);
            throw new AppError('Failed to get file URL', 500);
        }
    }

    async deleteFile(userId: number, fileName: string, folder: string): Promise<boolean> {
        try {
            return await this.s3Service.deleteFile(userId, fileName, folder);
        } catch (error) {
            console.error('Error deleting file:', error);
            throw new AppError('Failed to delete file', 500);
        }
    }
}