// src/infrastructure/database/repositories/TypeORMPaymentMethodRepository.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db/typeORM.config";
import { PaymentMethodEntity } from "../entities/PaymentMethodEntity";
import { PaymentMethod } from "../../../core/domain/entities/PaymentMethod";
import { PaymentMethodRepository } from "../../../core/domain/interfaces/repositories/PaymentMethodRepository";

export class TypeORMPaymentMethodRepository implements PaymentMethodRepository {
    private repository: Repository<PaymentMethodEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(PaymentMethodEntity);
    }

    async findAll(): Promise<PaymentMethod[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<PaymentMethod | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findByName(name: string): Promise<PaymentMethod | null> {
        return this.repository.findOne({ where: { name } });
    }

    async create(paymentMethod: Omit<PaymentMethod, "id">): Promise<PaymentMethod> {
        const newPaymentMethod = this.repository.create(paymentMethod);
        return this.repository.save(newPaymentMethod);
    }

    async update(paymentMethod: PaymentMethod): Promise<PaymentMethod | null> {
        if (!paymentMethod.id) {
            throw new Error('PaymentMethod ID is required for update');
        }

        const existingPaymentMethod = await this.repository.findOne({
            where: { id: paymentMethod.id }
        });
        
        if (!existingPaymentMethod) {
            return null;
        }

        // Update fields
        Object.assign(existingPaymentMethod, paymentMethod);

        // Save changes
        return this.repository.save(existingPaymentMethod);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}