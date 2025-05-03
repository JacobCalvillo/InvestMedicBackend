// src/core/domain/interfaces/repositories/PaymentMethodRepository.ts
import { PaymentMethod } from '../../../domain/entities/PaymentMethod';

export interface PaymentMethodRepository {
    findAll(): Promise<PaymentMethod[]>;
    findById(id: number): Promise<PaymentMethod | null>;
    findByName(name: string): Promise<PaymentMethod | null>;
    create(paymentMethod: Omit<PaymentMethod, "id">): Promise<PaymentMethod>;
    update(paymentMethod: PaymentMethod): Promise<PaymentMethod | null>;
    delete(id: number): Promise<boolean>;
}