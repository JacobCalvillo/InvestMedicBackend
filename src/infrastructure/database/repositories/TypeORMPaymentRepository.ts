// src/infrastructure/database/repositories/TypeORMPaymentRepository.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db/typeORM.config";
import { PaymentEntity } from "../entities/payment.entity";
import { Payment } from "../../../core/domain/entities/Payment";
import { PaymentRepository } from "../../../core/domain/interfaces/repositories/PaymentRepository";

export class TypeORMPaymentRepository implements PaymentRepository {
    private repository: Repository<PaymentEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(PaymentEntity);
    }

    async findAll(): Promise<Payment[]> {
        return this.repository.find({
            relations: ['paymentMethod', 'patient', 'invoice']
        });
    }

    async findById(id: number): Promise<Payment | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['paymentMethod', 'patient', 'invoice']
        });
    }

    async findByPatientId(patientId: number): Promise<Payment[]> {
        return this.repository.find({
            where: { patientId },
            relations: ['paymentMethod', 'invoice']
        });
    }

    async create(payment: Omit<Payment, "id">): Promise<Payment> {
        const newPayment = this.repository.create(payment);
        return this.repository.save(newPayment);
    }

    async update(payment: Payment): Promise<Payment | null> {
        if (!payment.id) {
            throw new Error('Payment ID is required for update');
        }

        const existingPayment = await this.repository.findOne({
            where: { id: payment.id }
        });
        
        if (!existingPayment) {
            return null;
        }

        // Update fields
        Object.assign(existingPayment, payment);

        // Save changes
        return this.repository.save(existingPayment);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}