// src/api/routes/payment.routes.ts
import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { validatePayment } from '../validators/payment.validator';
import { RequestHandler } from 'express';

export function paymentRoutes(paymentController: PaymentController, authenticate: RequestHandler): Router {
    const router = Router();

    // Get all payments
    router.get('/payments', authenticate, paymentController.getPayments);

    // Get payment by ID
    router.get('/payments/:id', authenticate, paymentController.getPaymentById);

    // Get payments by patient ID
    router.get('/patients/:id/payments', authenticate, paymentController.getPaymentsByPatientId);

    // Create new payment
    router.post(
        '/payments',
        authenticate,
        validatePayment,
        paymentController.createPayment
    );

    // Update payment
    router.put(
        '/payments/:id',
        authenticate,
        validatePayment,
        paymentController.updatePayment
    );

    // Delete payment
    router.delete(
        '/payments/:id',
        authenticate,
        paymentController.deletePayment
    );

    return router;
}