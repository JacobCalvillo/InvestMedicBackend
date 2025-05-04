// Pagos
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { OrganizationEntity } from "./OrganizationEntity";
import { PatientEntity } from "./PatientEntity";
import { AppointmentEntity } from "./AppointmentEntity";
import { PaymentMethodEntity } from "./PaymentMethodEntity";

@Entity({ name: "Payment" })
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "organization_id" })
    organizationId!: number;
    
    @Column({ name: "appointment_id", nullable: true })
    appointmentId?: number;
    
    @Column({ name: "patient_id" })
    patientId!: number;
    
    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount!: number;
    
    @Column({ length: 3 })
    currency!: string; // 'USD', 'MXN', etc.
    
    @Column({ length: 20 })
    status!: string; // 'pending', 'completed', 'refunded', 'failed'
    
    @Column({ length: 30 })
    method!: string; // 'credit_card', 'cash', 'transfer', etc.
    
    @Column({ name: "payment_date", nullable: true })
    paymentDate?: Date;
    
    @Column({ name: "stripe_payment_id", nullable: true })
    stripePaymentId?: string;

    @Column({ name: "payment_method_id" })
    paymentMethodId!: number;
    
    @Column({ name: "invoice_url", length: 2083, nullable: true })
    invoiceUrl?: string;
    
    @Column({ name: "receipt_url", length: 2083, nullable: true })
    receiptUrl?: string;
    
    @Column({ type: "text", nullable: true })
    notes?: string;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @ManyToOne(() => OrganizationEntity)
    @JoinColumn({ name: "organization_id" })
    organization!: OrganizationEntity;
    
    @OneToOne(() => AppointmentEntity, { nullable: true })
    @JoinColumn({ name: "appointment_id" })
    appointment?: AppointmentEntity;
    
    @ManyToOne(() => PatientEntity)
    @JoinColumn({ name: "patient_id" })
    patient!: PatientEntity;

    @ManyToOne(() => PaymentMethodEntity)
    @JoinColumn({ name: "payment_method_id" })
    paymentMethod!: PaymentMethodEntity;
}