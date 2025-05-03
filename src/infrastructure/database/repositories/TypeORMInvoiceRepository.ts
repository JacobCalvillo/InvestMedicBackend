// src/infrastructure/database/repositories/TypeORMInvoiceRepository.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db/typeORM.config";
import { InvoiceEntity } from "../entities/invoice.entity";
import { Invoice } from "../../../core/domain/entities/Invoice";
import { InvoiceRepository } from "../../../core/domain/interfaces/repositories/InvoiceRepository";

export class TypeORMInvoiceRepository implements InvoiceRepository {
    private repository: Repository<InvoiceEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(InvoiceEntity);
    }

    async findAll(): Promise<Invoice[]> {
        return this.repository.find({
            relations: ['patient', 'status', 'details', 'payments']
        });
    }

    async findById(id: number): Promise<Invoice | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['patient', 'status', 'details', 'payments']
        });
    }

    async findByPatientId(patientId: number): Promise<Invoice[]> {
        return this.repository.find({
            where: { patientId },
            relations: ['status', 'details', 'payments']
        });
    }

    async create(invoice: Omit<Invoice, "id">): Promise<Invoice> {
        const newInvoice = this.repository.create(invoice);
        return this.repository.save(newInvoice);
    }

    async update(invoice: Invoice): Promise<Invoice | null> {
        if (!invoice.id) {
            throw new Error('Invoice ID is required for update');
        }

        const existingInvoice = await this.repository.findOne({
            where: { id: invoice.id }
        });
        
        if (!existingInvoice) {
            return null;
        }

        // Update fields
        Object.assign(existingInvoice, invoice);

        // Save changes
        return this.repository.save(existingInvoice);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}