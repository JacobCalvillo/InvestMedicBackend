// src/api/routes/paymentMethod.routes.ts
import { Router } from 'express';
import { PaymentMethodController } from '../controllers/paymentmethod.controller';
import { validatePaymentMethod } from '../validators/paymentMethod.validator';
import { RequestHandler } from 'express';

export function paymentMethodRoutes(paymentMethodController: PaymentMethodController, authenticate: RequestHandler): Router {
    const router = Router();

    // Get all payment methods
    router.get('/payment-methods', authenticate, paymentMethodController.getPaymentMethods);

    // Get payment method by ID
    router.get('/payment-methods/:id', authenticate, paymentMethodController.getPaymentMethodById);

    // Create new payment method
    router.post(
        '/payment-methods',
        authenticate,
        validatePaymentMethod,
        paymentMethodController.createPaymentMethod
    );

    // Update payment method
    router.put(
        '/payment-methods/:id',
        authenticate,
        validatePaymentMethod,
        paymentMethodController.updatePaymentMethod
    );

    // Delete payment method
    router.delete(
        '/payment-methods/:id',
        authenticate,
        paymentMethodController.deletePaymentMethod
    );

    return router;
}