// src/core/services/PaymentMethodServiceImpl.ts
import { PaymentMethod } from "../domain/entities/PaymentMethod";
import { PaymentMethodRepository } from "../domain/interfaces/repositories/PaymentMethodRepository";
import { PaymentMethodService } from "../domain/interfaces/services/PaymentMethodService";
import { AppError } from "../domain/errors/AppError";

export class PaymentMethodServiceImpl implements PaymentMethodService {
    constructor(private paymentMethodRepository: PaymentMethodRepository) {}

    async getAllPaymentMethods(): Promise<PaymentMethod[]> {
        return this.paymentMethodRepository.findAll();
    }

    async getPaymentMethodById(id: number): Promise<PaymentMethod | null> {
        const paymentMethod = await this.paymentMethodRepository.findById(id);
        if (!paymentMethod) {
            throw new AppError('Payment method not found', 404);
        }
        return paymentMethod;
    }

    async createPaymentMethod(name: string): Promise<PaymentMethod> {
        // Check if payment method with the same name already exists
        const existingPaymentMethod = await this.paymentMethodRepository.findByName(name);
        if (existingPaymentMethod) {
            throw new AppError('Payment method with this name already exists', 409);
        }

        return this.paymentMethodRepository.create({ name });
    }

    async updatePaymentMethod(id: number, name: string): Promise<PaymentMethod | null> {
        // Check if payment method exists
        const paymentMethod = await this.paymentMethodRepository.findById(id);
        if (!paymentMethod) {
            throw new AppError('Payment method not found', 404);
        }

        // Check if another payment method with the same name already exists
        const existingPaymentMethod = await this.paymentMethodRepository.findByName(name);
        if (existingPaymentMethod && existingPaymentMethod.id !== id) {
            throw new AppError('Another payment method with this name already exists', 409);
        }

        paymentMethod.name = name;
        return this.paymentMethodRepository.update(paymentMethod);
    }

    async deletePaymentMethod(id: number): Promise<boolean> {
        // Check if payment method exists
        const paymentMethod = await this.paymentMethodRepository.findById(id);
        if (!paymentMethod) {
            throw new AppError('Payment method not found', 404);
        }

        return this.paymentMethodRepository.delete(id);
    }
}