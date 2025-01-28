import { Router } from "express";
import { createPaymentController, getPaymentsController } from "../controllers/paymentController";

const router = Router();

router.get('/payments', getPaymentsController);
router.post('/payment', createPaymentController);


export { router };