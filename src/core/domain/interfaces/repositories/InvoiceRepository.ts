// src/core/domain/interfaces/repositories/InvoiceRepository.ts
import { Invoice } from "../../../domain/entities/Invoice"

export interface InvoiceRepository {
    findAll(): Promise<Invoice[]>;
    findById(id: number): Promise<Invoice | null>;
    findByPatientId(patientId: number): Promise<Invoice[]>;
    create(invoice: Omit<Invoice, "id">): Promise<Invoice>;
    update(invoice: Invoice): Promise<Invoice | null>;
    delete(id: number): Promise<boolean>;
}