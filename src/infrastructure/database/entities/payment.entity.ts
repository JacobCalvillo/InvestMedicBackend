// src/infrastructure/database/entities/payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { PaymentMethodEntity } from "./payment-method.entity";
import { PatientEntity } from "./patient.entity";
import { InvoiceEntity } from "./invoice.entity";

@Entity({ name: "Payment" })
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "stripe_payment_id", nullable: false })
    stripePaymentId!: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    amount!: number;

    @Column({ length: 5, nullable: false })
    currency!: string;

    @Column({ name: "payment_method_id" })
    paymentMethodId!: number;

    @Column({ name: "patient_id" })
    patientId!: number;

    @Column({ name: "invoice_id" })
    invoiceId!: number;

    // Relaciones
    @ManyToOne(() => PaymentMethodEntity, method => method.payments)
    @JoinColumn({ name: "payment_method_id" })
    paymentMethod!: PaymentMethodEntity;

    @ManyToOne(() => PatientEntity, patient => patient.id)
    @JoinColumn({ name: "patient_id" })
    patient!: PatientEntity;

    @ManyToOne(() => InvoiceEntity, invoice => invoice.payments)
    @JoinColumn({ name: "invoice_id" })
    invoice!: InvoiceEntity;
}