// src/core/domain/interfaces/services/PaymentService.ts
import { Payment } from '../../../domain/entities/Payment';

export interface PaymentService {
    getAllPayments(): Promise<Payment[]>;
    getPaymentById(id: number): Promise<Payment | null>;
    getPaymentsByPatientId(patientId: number): Promise<Payment[]>;
    createPayment(payment: Omit<Payment, "id">): Promise<Payment>;
    updatePayment(payment: Payment): Promise<Payment | null>;
    deletePayment(id: number): Promise<boolean>;
}