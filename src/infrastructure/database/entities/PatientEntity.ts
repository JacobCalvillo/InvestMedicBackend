// Patient simplificado
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { UserEntity } from "./UserEntity";
import { OrganizationEntity } from "./OrganizationEntity";
import { AppointmentEntity } from "./AppointmentEntity";
import { MedicalRecordEntity } from "./MedicalRecordEntity";

@Entity({ name: "Patient" })
export class PatientEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "user_id", nullable: true }) // Opcional por si el paciente no tiene acceso
    userId?: number;
    
    @Column({ name: "organization_id" })
    organizationId!: number;
    
    @Column({ length: 50 })
    name!: string;
    
    @Column({ name: "last_name", length: 50 })
    lastName!: string;
    
    @Column({ name: "birth_date" })
    birthDate!: Date;
    
    @Column({ length: 10, nullable: true })
    gender?: string; // ENUM: 'male', 'female', 'other'
    
    @Column({ length: 50, nullable: true })
    email?: string;
    
    @Column({ length: 20, nullable: true })
    phone?: string;
    
    @Column({ length: 200, nullable: true })
    address?: string;
    
    @Column({ length: 50, nullable: true })
    city?: string;
    
    @Column({ length: 50, nullable: true })
    state?: string;
    
    @Column({ name: "postal_code", length: 10, nullable: true })
    postalCode?: string;
    
    @Column({ name: "marital_status", length: 20, nullable: true })
    maritalStatus?: string; // ENUM: 'single', 'married', 'divorced', etc.
    
    @Column({ length: 50, nullable: true })
    occupation?: string;
    
    @Column({ name: "emergency_contact_name", length: 100, nullable: true })
    emergencyContactName?: string;
    
    @Column({ name: "emergency_contact_phone", length: 20, nullable: true })
    emergencyContactPhone?: string;
    
    @Column({ name: "emergency_contact_relationship", length: 20, nullable: true })
    emergencyContactRelationship?: string;
    
    @Column({ name: "identification_type", length: 20, nullable: true })
    identificationType?: string; // ENUM: 'dni', 'passport', etc.
    
    @Column({ name: "identification_number", length: 30, nullable: true })
    identificationNumber?: string;
    
    @Column({ name: "identification_document_url", length: 2083, nullable: true })
    identificationDocumentUrl?: string;
    
    @Column({ name: "insurance_name", length: 100, nullable: true })
    insuranceName?: string;
    
    @Column({ name: "insurance_number", length: 50, nullable: true })
    insuranceNumber?: string;
    
    @Column({ name: "privacy_consent", default: false })
    privacyConsent!: boolean;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @OneToOne(() => UserEntity, { nullable: true })
    @JoinColumn({ name: "user_id" })
    user?: UserEntity;
    
    @ManyToOne(() => OrganizationEntity)
    @JoinColumn({ name: "organization_id" })
    organization!: OrganizationEntity;
    
    @OneToMany(() => AppointmentEntity, appointment => appointment.patient)
    appointments!: AppointmentEntity[];
    
    @OneToMany(() => MedicalRecordEntity, record => record.patient)
    medicalRecords!: MedicalRecordEntity[];
}