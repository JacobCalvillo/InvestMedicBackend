// src/infrastructure/database/entities/invoice.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { PatientEntity } from "./patient.entity";
import { StatusEntity } from "./status.entity";
import { InvoiceDetailsEntity } from "./invoice-details.entity";
import { PaymentEntity } from "./payment.entity";

@Entity({ name: "Invoice" })
export class InvoiceEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "total_amount", type: "decimal", precision: 10, scale: 2, nullable: false })
    totalAmount!: number;

    @Column({ name: "issue_date", type: "date", nullable: false })
    issueDate!: Date;

    @Column({ name: "due_date", type: "date", nullable: true })
    dueDate?: Date;

    @Column({ name: "patient_id" })
    patientId!: number;

    @Column({ name: "status_id" })
    statusId!: number;

    // Relaciones
    @ManyToOne(() => PatientEntity, patient => patient.id)
    @JoinColumn({ name: "patient_id" })
    patient!: PatientEntity;

    @ManyToOne(() => StatusEntity, status => status.invoices)
    @JoinColumn({ name: "status_id" })
    status!: StatusEntity;

    @OneToMany(() => InvoiceDetailsEntity, detail => detail.invoice)
    details!: InvoiceDetailsEntity[];

    @OneToMany(() => PaymentEntity, payment => payment.invoice)
    payments!: PaymentEntity[];
}