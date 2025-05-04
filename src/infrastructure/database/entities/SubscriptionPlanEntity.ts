// Planes de suscripción
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { OrganizationEntity } from "./OrganizationEntity";

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
