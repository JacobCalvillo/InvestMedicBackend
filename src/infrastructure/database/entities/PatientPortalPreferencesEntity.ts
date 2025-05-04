// Preferencias del portal del paciente
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { PatientEntity } from "./PatientEntity";


@Entity({ name: "Patient_Portal_Preferences" })
export class PatientPortalPreferencesEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "patient_id" })
    patientId!: number;
    
    @Column({ name: "receive_email_notifications", default: true })
    receiveEmailNotifications!: boolean;
    
    @Column({ name: "receive_sms_notifications", default: false })
    receiveSmsNotifications!: boolean;
    
    @Column({ name: "appointment_reminders_hours_before", default: 24 })
    appointmentRemindersHoursBefore!: number;
    
    @Column({ name: "medical_record_updates_enabled", default: true })
    medicalRecordUpdatesEnabled!: boolean;
    
    @Column({ name: "default_language", length: 10, default: "es" })
    defaultLanguage!: string; // ISO 639-1
    
    @Column({ name: "last_login", nullable: true })
    lastLogin?: Date;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @OneToOne(() => PatientEntity)
    @JoinColumn({ name: "patient_id" })
    patient!: PatientEntity;
}

// Consentimientos específicos del paciente (GDPR, compartir datos, etc.)
@Entity({ name: "Patient_Consent" })
export class PatientConsentEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "patient_id" })
    patientId!: number;
    
    @Column({ length: 50 })
    type!: string; // 'privacy_policy', 'terms_of_service', 'data_sharing', etc.
    
    @Column({ default: false })
    granted!: boolean;
    
    @Column({ name: "granted_at", nullable: true })
    grantedAt?: Date;
    
    @Column({ name: "ip_address", length: 45, nullable: true })
    ipAddress?: string;
    
    @Column({ name: "document_version", length: 20, nullable: true })
    documentVersion?: string;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    // Relaciones
    @ManyToOne(() => PatientEntity)
    @JoinColumn({ name: "patient_id" })
    patient!: PatientEntity;
}