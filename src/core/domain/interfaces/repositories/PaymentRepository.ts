// src/core/domain/interfaces/repositories/PaymentRepository.ts
import { Payment } from '../../../domain/entities/Payment';

export interface PaymentRepository {
    findAll(): Promise<Payment[]>;
    findById(id: number): Promise<Payment | null>;
    findByPatientId(patientId: number): Promise<Payment[]>;
    create(payment: Omit<Payment, "id">): Promise<Payment>;
    update(payment: Payment): Promise<Payment | null>;
    delete(id: number): Promise<boolean>;
}