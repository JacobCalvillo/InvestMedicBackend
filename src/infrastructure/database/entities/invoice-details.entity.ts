// src/infrastructure/database/entities/invoice-details.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { InvoiceEntity } from "./invoice.entity";
import { ServiceEntity } from "./service.entity";

@Entity({ name: "Invoice_Details" })
export class InvoiceDetailsEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "invoice_id" })
    invoiceId!: number;

    @Column({ name: "service_id" })
    serviceId!: number;

    @Column({ default: 1 })
    quantity!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    subtotal!: number;

    // Relaciones
    @ManyToOne(() => InvoiceEntity, invoice => invoice.details)
    @JoinColumn({ name: "invoice_id" })
    invoice!: InvoiceEntity;

    @ManyToOne(() => ServiceEntity, service => service.invoiceDetails)
    @JoinColumn({ name: "service_id" })
    service!: ServiceEntity;
}