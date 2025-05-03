// src/core/domain/entities/Invoice.ts
export interface Invoice {
    id?: number;
    totalAmount: number;
    issueDate: Date;
    dueDate?: Date;
    patientId: number;
    statusId: number;
    createdAt?: Date;
    updatedAt?: Date;
}