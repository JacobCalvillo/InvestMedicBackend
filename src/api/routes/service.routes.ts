import {
    getServicesController,
    getServiceByIdController,
    createServiceController,
    stripeSessionController
} from '../controllers/service.controller';
import { Router } from 'express';

const router = Router();

//GET
router.get('/services', getServicesController);
router.get('/service/:id', getServiceByIdController)

//POST
router.post('/services', createServiceController);
router.post('/services/stripe', stripeSessionController);

export { router };