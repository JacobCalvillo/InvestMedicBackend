// src/core/domain/interfaces/services/PaymentMethodService.ts
import { PaymentMethod } from '../../../domain/entities/PaymentMethod';

export interface PaymentMethodService {
    getAllPaymentMethods(): Promise<PaymentMethod[]>;
    getPaymentMethodById(id: number): Promise<PaymentMethod | null>;
    createPaymentMethod(name: string): Promise<PaymentMethod>;
    updatePaymentMethod(id: number, name: string): Promise<PaymentMethod | null>;
    deletePaymentMethod(id: number): Promise<boolean>;
}