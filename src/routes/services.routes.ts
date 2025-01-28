import { Router } from "express";
import { createServiceController, getServicesController, getServiceByIdController } from "../controllers/servicesController";

const router = Router();

router.get('/services', getServicesController);
router.get('/service/:id', getServiceByIdController);


router.post('/service', createServiceController);

export { router };