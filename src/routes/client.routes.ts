import { createCustomerController, getClientSecretController } from "../controllers/customer.controller";
import { Router } from "express";


const router = Router();

router.post('/client', createCustomerController);

router.post('/client/secret', getClientSecretController);

export { router };