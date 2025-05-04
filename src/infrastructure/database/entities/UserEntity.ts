// User mejorado
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { OrganizationEntity } from "./OrganizationEntity";
import { PatientEntity } from "./PatientEntity";
import { MedicalPractitionerEntity } from "./MedicalPractitionerEntity";

@Entity({ name: "User" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "organization_id" })
    organizationId!: number;
    
    @Column({ length: 80 })
    username!: string;
    
    @Column({ length: 255 })
    email!: string;
    
    @Column({ select: false }) // No seleccionar por defecto
    password!: string;
    
    @Column({ length: 20, nullable: true })
    phone?: string;
    
    @Column({ name: "profile_picture_url", length: 2083, nullable: true })
    profilePictureUrl?: string;
    
    @Column({ length: 20 })
    role!: string; // 'admin', 'doctor', 'assistant', 'patient', etc.
    
    @Column({ default: true })
    isActive!: boolean;
    
    @Column({ name: "last_login", nullable: true })
    lastLogin?: Date;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @ManyToOne(() => OrganizationEntity)
    @JoinColumn({ name: "organization_id" })
    organization!: OrganizationEntity;
    
    @OneToOne(() => PatientEntity, patient => patient.user)
    patient?: PatientEntity;
    
    @OneToOne(() => MedicalPractitionerEntity, practitioner => practitioner.user)
    practitioner?: MedicalPractitionerEntity;
}