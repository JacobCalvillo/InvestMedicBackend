// Servicios
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { OrganizationEntity } from "./OrganizationEntity";
import { AppointmentEntity } from "./AppointmentEntity";
import { MedicalPractitionerEntity } from "./MedicalPractitionerEntity";

@Entity({ name: "Service" })
export class ServiceEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "organization_id" })
    organizationId!: number;
    
    @Column({ length: 100 })
    name!: string;
    
    @Column({ type: "text", nullable: true })
    description?: string;
    
    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;
    
    @Column({ name: "duration_minutes" })
    durationMinutes!: number;
    
    @Column({ length: 30, nullable: true })
    category?: string;
    
    @Column({ name: "is_active", default: true })
    isActive!: boolean;
    
    @Column({ name: "image_url", length: 2083, nullable: true })
    imageUrl?: string;
    
    @Column({ name: "stripe_product_id", nullable: true })
    stripeProductId?: string;
    
    @Column({ name: "stripe_price_id", nullable: true })
    stripePriceId?: string;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @ManyToOne(() => OrganizationEntity)
    @JoinColumn({ name: "organization_id" })
    organization!: OrganizationEntity;
    
    @OneToMany(() => AppointmentEntity, appointment => appointment.service)
    appointments!: AppointmentEntity[];
    
    @ManyToMany(() => MedicalPractitionerEntity)
    @JoinTable({
        name: "Practitioner_Service",
        joinColumn: { name: "service_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "practitioner_id", referencedColumnName: "id" }
    })
    practitioners!: MedicalPractitionerEntity[];
}