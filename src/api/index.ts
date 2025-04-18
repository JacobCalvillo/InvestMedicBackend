import express from 'express';
import { client } from '../config/db/connect.db';
import { PostgresAppointmentRepository } from '../infrastructure/database/repositories/PostgresAppointmentRepository';
import { AppointmentService } from '../core/services/appointment.service';
import { AppointmentController } from './controllers/appointment.controller';
import { appointmentRoutes } from './routes/appointment.routes';
import { EmailNotificationService } from '../infrastructure/email/EmailNotificationService';
import { JwtAuthService } from '../infrastructure/security/JwtAuthService';
import { createAuthMiddleware } from './middleware/auth.middleware';
import {PasswordHasher} from "../infrastructure/security/PasswordHasher";
import {PostgresUserRepository} from "../infrastructure/database/repositories/PostgresUserRepository";
import {UserServiceImpl} from "../core/services/UserServiceImpl";
import {UserController} from "./controllers/user.controller";
import {userRoutes} from "./routes/user.routes";
import {IdentificationTypesImpl} from "../core/services/IdentificationTypesImpl";
import {
    PostgresIdentificationTypesRepository
} from "../infrastructure/database/repositories/PostgresIdentificationTypesRepository";
import {IdentificationTypesController} from "./controllers/identificationTypes.controller";
import {identificationTypesRoutes} from "./routes/identificationTypes.routes";

export function setupRoutes(app: express.Application): void {
    // Create database connection
    const dbPool = client();

    // Create repositories
    const appointmentRepository = new PostgresAppointmentRepository(dbPool);
    const userRepository = new PostgresUserRepository(dbPool);
    const identificationTypesRepository = new PostgresIdentificationTypesRepository(dbPool);

    // servicios compartidos
    const passwordHasher =  new PasswordHasher();
    const authService = new JwtAuthService();

    // Create services
    const notificationService = new EmailNotificationService();
    const appointmentService = new AppointmentService(appointmentRepository, notificationService);
    const userService = new UserServiceImpl(userRepository, passwordHasher, authService);
    const identificationTypesService = new IdentificationTypesImpl(identificationTypesRepository);


    // Create middleware
    const authenticate = createAuthMiddleware(authService);

    // Create controllers
    const appointmentController = new AppointmentController(appointmentService);
    const userController = new UserController(userService);
    const identificationTypesController = new IdentificationTypesController(identificationTypesService);

    // Register routes
    app.use('/api/v1', appointmentRoutes(appointmentController, authenticate));
    app.use('/api/v1', userRoutes(userController));
    app.use('/api/v1', identificationTypesRoutes(identificationTypesController, authenticate));

    // Add more routes as needed...
}