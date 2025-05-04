// Organización (clínica o consultorio médico)
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { ServiceEntity } from "./ServiceEntity";

@Entity({ name: "Organization" })
export class OrganizationEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ length: 100 })
    name!: string;
    
    @Column({ length: 300, nullable: true })
    description?: string;
    
    @Column({ length: 200, nullable: true })
    address?: string;
    
    @Column({ length: 50, nullable: true })
    phone?: string;
    
    @Column({ length: 100, nullable: true })
    email?: string;
    
    @Column({ length: 2083, nullable: true })
    logoUrl?: string;
    
    @Column({ nullable: true })
    subscriptionId?: number;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @OneToMany(() => UserEntity, user => user.organization)
    users!: UserEntity[];
    
    @OneToMany(() => ServiceEntity, service => service.organization)
    services!: ServiceEntity[];
    
    @ManyToOne(() => SubscriptionPlanEntity)
    @JoinColumn({ name: "subscription_id" })
    subscriptionPlan?: SubscriptionPlanEntity;
}

// Planes de suscripción
@Entity({ name: "Subscription_Plan" })
export class SubscriptionPlanEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ length: 50 })
    name!: string;
    
    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;
    
    @Column({ name: "billing_cycle", length: 20 })
    billingCycle!: string; // 'monthly', 'yearly'
    
    @Column()
    maxUsers!: number;
    
    @Column()
    maxPatients!: number;
    
    @Column()
    features!: string; // JSON string with feature flags
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @OneToMany(() => OrganizationEntity, organization => organization.subscriptionPlan)
    organizations!: OrganizationEntity[];
}

// Suscripciones (instancias concretas de planes)
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