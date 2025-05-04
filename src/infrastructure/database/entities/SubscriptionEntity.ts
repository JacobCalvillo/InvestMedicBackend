// Suscripciones (instancias concretas de planes)
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { OrganizationEntity } from "./OrganizationEntity";
import { SubscriptionPlanEntity } from "./SubscriptionPlanEntity";

@Entity({ name: "Subscription" })
export class SubscriptionEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "organization_id" })
    organizationId!: number;
    
    @Column({ name: "subscription_plan_id" })
    subscriptionPlanId!: number;
    
    @Column({ name: "start_date" })
    startDate!: Date;
    
    @Column({ name: "end_date", nullable: true })
    endDate?: Date;
    
    @Column({ name: "is_active", default: true })
    isActive!: boolean;
    
    @Column({ name: "payment_status", length: 20 })
    paymentStatus!: string; // 'paid', 'pending', 'failed'
    
    @Column({ name: "stripe_subscription_id", nullable: true })
    stripeSubscriptionId?: string;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @ManyToOne(() => OrganizationEntity)
    @JoinColumn({ name: "organization_id" })
    organization!: OrganizationEntity;
    
    @ManyToOne(() => SubscriptionPlanEntity)
    @JoinColumn({ name: "subscription_plan_id" })
    subscriptionPlan!: SubscriptionPlanEntity;
}