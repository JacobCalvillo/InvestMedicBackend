// src/core/domain/interfaces/services/FileService.ts
export interface FileService {
    uploadFile(file: Express.Multer.File, userId: number, folder: string): Promise<string>;
    getFileUrl(userId: number, fileName: string, folder: string): Promise<string>;
    deleteFile(userId: number, fileName: string, folder: string): Promise<boolean>;
}