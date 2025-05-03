// src/api/routes/file.routes.ts
import { Router } from 'express';
import { FileController } from '../controllers/file.controller';
import { RequestHandler } from 'express';
import multer from 'multer';

// Configurar multer para almacenar los archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

export function fileRoutes(fileController: FileController, authenticate: RequestHandler): Router {
    const router = Router();

    // Subir un archivo
    router.post(
        '/files/:id',
        authenticate,
        upload.single('file'),
        fileController.uploadFile
    );

    // Obtener la URL de un archivo
    router.get(
        '/files/:id',
        authenticate,
        fileController.getFileUrl
    );

    // Eliminar un archivo
    router.delete(
        '/files/:id',
        authenticate,
        fileController.deleteFile
    );

    return router;
}