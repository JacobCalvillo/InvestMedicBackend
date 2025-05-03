// src/infrastructure/storage/S3ServiceImpl.ts
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Service } from '../../core/domain/interfaces/services/S3Service';
import { AppError } from '../../core/domain/errors/AppError';
import dotenv from 'dotenv';

dotenv.config();

export class S3ServiceImpl implements S3Service {
    private s3Client: S3Client;
    private bucketName: string;

    constructor() {
        // Verificar que todas las variables de entorno necesarias estén definidas
        const requiredEnvVars = {
            BUCKET_REGION: process.env.BUCKET_REGION,
            AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
            AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME
        };

        const missingVars = Object.entries(requiredEnvVars)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingVars.length > 0) {
            throw new Error(`Missing required AWS environment variables: ${missingVars.join(', ')}`);
        }

        this.s3Client = new S3Client({
            region: process.env.BUCKET_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
        });

        this.bucketName = process.env.AWS_BUCKET_NAME!;
    }

    async uploadFile(file: Express.Multer.File, folder: string, userId: number): Promise<string> {
        try {
            const fileName = `${Date.now()}-${file.originalname}`;
            const key = `${folder}/${userId}/${fileName}`;

            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype
            });

            await this.s3Client.send(command);

            // Retornar la URL del archivo
            return `https://${this.bucketName}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${key}`;
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw new AppError('Failed to upload file to S3', 500);
        }
    }

    async getFileUrl(userId: number, fileName: string, folder: string): Promise<string> {
        try {
            const key = `${folder}/${userId}/${fileName}`;

            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: key
            });

            // Generar URL firmada que expira en 1 hora
            const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
            return url;
        } catch (error) {
            console.error('Error getting signed URL:', error);
            throw new AppError('Failed to get file URL', 500);
        }
    }

    async deleteFile(userId: number, fileName: string, folder: string): Promise<boolean> {
        try {
            const key = `${folder}/${userId}/${fileName}`;

            const command = new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key
            });

            await this.s3Client.send(command);
            return true;
        } catch (error) {
            console.error('Error deleting file from S3:', error);
            throw new AppError('Failed to delete file from S3', 500);
        }
    }
}