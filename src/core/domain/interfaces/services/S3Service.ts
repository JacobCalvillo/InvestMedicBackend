// src/core/domain/interfaces/services/S3Service.ts
export interface S3Service {
    uploadFile(file: Express.Multer.File, folder: string, userId: number): Promise<string>;
    getFileUrl(userId: number, fileName: string, folder: string): Promise<string>;
    deleteFile(userId: number, fileName: string, folder: string): Promise<boolean>;
}