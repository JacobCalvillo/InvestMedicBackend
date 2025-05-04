// src/api/index.ts
import express from 'express';
import { TypeORMUserRepository } from "../infrastructure/database/repositories/TypeORMUserRepository";
import { TypeORMAppointmentRepository } from '../infrastructure/database/repositories/TypeORMAppointmentRepository';
import { TypeORMPatientRepository } from '../infrastructure/database/repositories/TypeORMPatientRepository';
import { TypeORMServiceRepository } from '../infrastructure/database/repositories/TypeORMServiceRepository';
import { TypeORMPaymentMethodRepository } from '../infrastructure/database/repositories/TypeORMPaymentMethodRepository';
import { TypeORMPaymentRepository } from '../infrastructure/database/repositories/TypeORMPaymentRepository';
import { TypeORMStatusRepository } from '../infrastructure/database/repositories/TypeORMStatusRepository';
import { TypeORMInvoiceRepository } from '../infrastructure/database/repositories/TypeORMInvoiceRepository';

import { AppointmentService } from '../core/services/appointment.service';
import { AppointmentController } from './controllers/appointment.controller';
import { appointmentRoutes } from './routes/appointment.routes';

import { EmailNotificationService } from '../infrastructure/email/EmailNotificationService';
import { JwtAuthService } from '../infrastructure/security/JwtAuthService';
import { createAuthMiddleware } from './middleware/auth.middleware';
import { PasswordHasher } from "../infrastructure/security/PasswordHasher";
import { UserServiceImpl } from "../core/services/UserServiceImpl";
import { UserController } from "./controllers/user.controller";
import { userRoutes } from "./routes/user.routes";

import { TypeORMMedicalPractitionerServiceRepository } from "../infrastructure/database/repositories/TypeORMMedicalPractitionerServiceRepository";

// Importa el StripeService que usa el patrón Singleton
import { StripeService } from "../infrastructure/payment/StripeService";
import { ServiceServiceImpl } from '../core/services/ServiceServiceImpl';
import { ServiceController } from "./controllers/service.controller";
import { serviceRoutes } from "./routes/service.routes";

import { PaymentMethodServiceImpl } from "../core/services/PaymentMethodServiceImpl";
import { PaymentMethodController } from "./controllers/paymentmethod.controller";
import { paymentMethodRoutes } from './routes/paymentmethod.routes';

import { StatusServiceImpl } from "../core/services/StatusServiceImpl";
import { StatusController } from "./controllers/status.controller";
import { statusRoutes } from "./routes/status.routes";

import { PaymentServiceImpl } from "../core/services/PaymentServiceImpl";
import { PaymentController } from "./controllers/payment.controller";
import { paymentRoutes } from "./routes/payment.routes";

import { FileServiceImpl } from "../core/services/FileServiceImpl";
import { S3ServiceImpl } from "../infrastructure/storage/S3ServiceImpl";
import { FileController } from "./controllers/file.controller";
import { fileRoutes } from "./routes/file.routes";

// Importar el WebhookController y las rutas (si faltaban)
// import { WebhookController } from "../webhook/webhook.controller";
// import { webhookRoutes } from "./routes/webhook.routes";

export function setupRoutes(app: express.Application): void {
    // Create repositories
    const userRepository = new TypeORMUserRepository();
    const appointmentRepository = new TypeORMAppointmentRepository();
    const patientRepository = new TypeORMPatientRepository();
    const serviceRepository = new TypeORMServiceRepository();
    const paymentMethodRepository = new TypeORMPaymentMethodRepository();
    const paymentRepository = new TypeORMPaymentRepository();
    const statusRepository = new TypeORMStatusRepository();
    const invoiceRepository = new TypeORMInvoiceRepository();

    // Create shared services
    const passwordHasher = new PasswordHasher();
    const authService = new JwtAuthService();
    const notificationService = new EmailNotificationService();
    // Usar la instancia de Singleton para Stripe
    const stripeService = StripeService.getInstance();

    // Create business services
    const appointmentService = new AppointmentService(appointmentRepository, notificationService);
    const userService = new UserServiceImpl(userRepository, passwordHasher, authService);
    const serviceService = new ServiceServiceImpl(serviceRepository, stripeService);
    const paymentMethodService = new PaymentMethodServiceImpl(paymentMethodRepository);
    const statusService = new StatusServiceImpl(statusRepository);
    const paymentService = new PaymentServiceImpl(
        paymentRepository,
        paymentMethodRepository,
        patientRepository,
        invoiceRepository
    );

    // Create middleware
    const authenticate = createAuthMiddleware(authService);

    // Create controllers
    const appointmentController = new AppointmentController(appointmentService);
    const userController = new UserController(userService);
    const serviceController = new ServiceController(serviceService);
    const paymentMethodController = new PaymentMethodController(paymentMethodService);
    const statusController = new StatusController(statusService);
    const paymentController = new PaymentController(paymentService);
    const s3Service = new S3ServiceImpl();
    const fileService = new FileServiceImpl(s3Service);
    const fileController = new FileController(fileService);
    //const webhookController = new WebhookController(stripeService);

    const medicalPractitionerServiceRepository = new TypeORMMedicalPractitionerServiceRepository();
    

    // Register routes
    app.use('/api/v1', appointmentRoutes(appointmentController, authenticate));
    app.use('/api/v1', userRoutes(userController));
    app.use('/api/v1', serviceRoutes(serviceController, authenticate));
    app.use('/api/v1', paymentMethodRoutes(paymentMethodController, authenticate));
    app.use('/api/v1', statusRoutes(statusController, authenticate));
    app.use('/api/v1', paymentRoutes(paymentController, authenticate));
    app.use('/api/v1', fileRoutes(fileController, authenticate));

   // app.use('/api/v1', webhookRoutes(webhookController));
}