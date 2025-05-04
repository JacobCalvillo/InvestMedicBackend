// Métodos de pago
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { OrganizationEntity } from "./OrganizationEntity";
import { PaymentEntity } from "./PaymentEntity";

@Entity({ name: "Payment_Method" })
export class PaymentMethodEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "organization_id" })
    organizationId!: number;
    
    @Column({ length: 50 })
    name!: string; // 'credit_card', 'cash', 'bank_transfer', etc.
    
    @Column({ length: 100, nullable: true })
    description?: string;
    
    @Column({ name: "stripe_payment_method_id", nullable: true })
    stripePaymentMethodId?: string; // ID del método de pago en Stripe, si aplica
    
    @Column({ name: "icon_url", length: 2083, nullable: true })
    iconUrl?: string;
    
    @Column({ name: "is_online", default: true })
    isOnline!: boolean; // Si el pago se realiza en línea o presencialmente
    
    @Column({ name: "is_active", default: true })
    isActive!: boolean;
    
    @Column({ name: "requires_verification", default: false })
    requiresVerification!: boolean; // Para métodos como transferencias bancarias
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @ManyToOne(() => OrganizationEntity)
    @JoinColumn({ name: "organization_id" })
    organization!: OrganizationEntity;
    
    @OneToMany(() => PaymentEntity, payment => payment.paymentMethod)
    payments!: PaymentEntity[];
}