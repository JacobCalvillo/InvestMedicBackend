import { getServicesController, getServiceByIdController } from '../controllers/service.controller';
import { Router } from 'express';

const router = Router();

//GET
router.get('/services', getServicesController);
router.get('/service/:id', getServiceByIdController)


export { router };