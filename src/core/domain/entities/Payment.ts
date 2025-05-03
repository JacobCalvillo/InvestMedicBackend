// src/core/domain/entities/Payment.ts
export interface Payment {
    id?: number;
    stripePaymentId?: string;
    amount: number;
    currency: string;
    paymentMethodId: number;
    patientId: number;
    invoiceId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}