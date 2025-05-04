// Compartir documentos médicos
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { MedicalDocumentEntity } from "./MedicalRecordEntity";
import { PatientEntity } from "./PatientEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name: "Shared_Medical_Document" })
export class SharedMedicalDocumentEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "document_id" })
    documentId!: number;
    
    @Column({ name: "patient_id" })
    patientId!: number;
    
    @Column({ name: "shared_by_user_id" })
    sharedByUserId!: number;
    
    @Column({ length: 100, nullable: true })
    recipientEmail?: string;
    
    @Column({ length: 100, nullable: true })
    recipientName?: string;
    
    @Column({ name: "access_token", length: 64 })
    accessToken!: string; // Token único para acceso
    
    @Column({ name: "expires_at", nullable: true })
    expiresAt?: Date;
    
    @Column({ name: "times_accessed", default: 0 })
    timesAccessed!: number;
    
    @Column({ name: "is_active", default: true })
    isActive!: boolean;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @ManyToOne(() => MedicalDocumentEntity)
    @JoinColumn({ name: "document_id" })
    document!: MedicalDocumentEntity;
    
    @ManyToOne(() => PatientEntity)
    @JoinColumn({ name: "patient_id" })
    patient!: PatientEntity;
    
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "shared_by_user_id" })
    sharedByUser!: UserEntity;
}