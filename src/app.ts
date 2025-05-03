// src/app.ts
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { setupRoutes } from './api';
import { errorHandler } from './api/middleware/error.middleware';
import { initializeDatabase } from "./config/db/typeORM.config";

export async function createApp(): Promise<express.Application> {
    await initializeDatabase();

    const app = express();

    // Middleware
    app.use(cors({
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Setup routes
    setupRoutes(app);

    // Error handling middleware
    app.use(errorHandler);

    return app;
}