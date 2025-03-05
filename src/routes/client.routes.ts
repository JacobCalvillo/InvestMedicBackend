import {
    createCustomerController,
    getClientSecretController,
    createPaymentController
} from "../controllers/customer.controller";
import { Router } from "express";

const router = Router();

//POST

router.post('/client', createCustomerController);
router.post('/client/secret', getClientSecretController);
router.post('/client/payment', createPaymentController);

export { router };