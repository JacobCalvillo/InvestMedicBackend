// src/api/routes/service.routes.ts
import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';
import { validateService, validateCheckoutSession } from '../validators/service.validator';
import { RequestHandler } from 'express';

export function serviceRoutes(serviceController: ServiceController, authenticate: RequestHandler): Router {
    const router = Router();

    // Get all services
    router.get('/services', serviceController.getServices);

    // Get service by ID
    router.get('/services/:id', serviceController.getServiceById);

    // Create new service
    router.post(
        '/services',
        authenticate,
        validateService,
        serviceController.createService
    );

    // Update service
    router.put(
        '/services/:id',
        authenticate,
        validateService,
        serviceController.updateService
    );

    // Delete service
    router.delete(
        '/services/:id',
        authenticate,
        serviceController.deleteService
    );

    // Create checkout session
    router.post(
        '/services/stripe',
        validateCheckoutSession,
        serviceController.createCheckoutSession
    );

    return router;
}