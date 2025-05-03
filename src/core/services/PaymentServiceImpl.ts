// src/core/services/PaymentServiceImpl.ts
import { Payment } from "../domain/entities/Payment";
import { PaymentRepository } from "../domain/interfaces/repositories/PaymentRepository";
import { PaymentService } from "../domain/interfaces/services/PaymentService";
import { PaymentMethodRepository } from "../domain/interfaces/repositories/PaymentMethodRepository";
import { PatientRepository } from "../domain/interfaces/repositories/PatientRepository";
import { InvoiceRepository } from "../domain/interfaces/repositories/InvoiceRepository";
import { AppError } from "../domain/errors/AppError";

export class PaymentServiceImpl implements PaymentService {
    constructor(
        private paymentRepository: PaymentRepository,
        private paymentMethodRepository: PaymentMethodRepository,
        private patientRepository: PatientRepository,
        private invoiceRepository: InvoiceRepository
    ) {}

    async getAllPayments(): Promise<Payment[]> {
        return this.paymentRepository.findAll();
    }

    async getPaymentById(id: number): Promise<Payment | null> {
        const payment = await this.paymentRepository.findById(id);
        if (!payment) {
            throw new AppError('Payment not found', 404);
        }
        return payment;
    }

    async getPaymentsByPatientId(patientId: number): Promise<Payment[]> {
        // Check if patient exists
        const patient = await this.patientRepository.findById(patientId);
        if (!patient) {
            throw new AppError('Patient not found', 404);
        }

        return this.paymentRepository.findByPatientId(patientId);
    }

    async createPayment(payment: Omit<Payment, "id">): Promise<Payment> {
        // Validate payment method
        const paymentMethod = await this.paymentMethodRepository.findById(payment.paymentMethodId);
        if (!paymentMethod) {
            throw new AppError('Payment method not found', 404);
        }

        // Validate patient
        const patient = await this.patientRepository.findById(payment.patientId);
        if (!patient) {
            throw new AppError('Patient not found', 404);
        }

        // Validate invoice if provided
        if (payment.invoiceId) {
            const invoice = await this.invoiceRepository.findById(payment.invoiceId);
            if (!invoice) {
                throw new AppError('Invoice not found', 404);
            }
        }

        return this.paymentRepository.create(payment);
    }

    async updatePayment(payment: Payment): Promise<Payment | null> {
        // Check if payment exists
        const existingPayment = await this.paymentRepository.findById(payment.id!);
        if (!existingPayment) {
            throw new AppError('Payment not found', 404);
        }

        // Validate payment method
        const paymentMethod = await this.paymentMethodRepository.findById(payment.paymentMethodId);
        if (!paymentMethod) {
            throw new AppError('Payment method not found', 404);
        }

        // Validate patient
        const patient = await this.patientRepository.findById(payment.patientId);
        if (!patient) {
            throw new AppError('Patient not found', 404);
        }

        // Validate invoice if provided
        if (payment.invoiceId) {
            const invoice = await this.invoiceRepository.findById(payment.invoiceId);
            if (!invoice) {
                throw new AppError('Invoice not found', 404);
            }
        }

        return this.paymentRepository.update(payment);
    }

    async deletePayment(id: number): Promise<boolean> {
        // Check if payment exists
        const payment = await this.paymentRepository.findById(id);
        if (!payment) {
            throw new AppError('Payment not found', 404);
        }

        return this.paymentRepository.delete(id);
    }
}