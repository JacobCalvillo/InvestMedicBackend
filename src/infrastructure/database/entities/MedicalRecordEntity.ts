// Historial Médico (estructura base)
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { OrganizationEntity } from "./OrganizationEntity";
import { PatientEntity } from "./PatientEntity";
import { MedicalPractitionerEntity } from "./MedicalPractitionerEntity";
import { AppointmentEntity } from "./AppointmentEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name: "Medical_Record" })
export class MedicalRecordEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "organization_id" })
    organizationId!: number;
    
    @Column({ name: "patient_id" })
    patientId!: number;
    
    @Column({ name: "practitioner_id" })
    practitionerId!: number;
    
    @Column({ name: "appointment_id", nullable: true })
    appointmentId?: number;
    
    @Column({ name: "record_date" })
    recordDate!: Date;
    
    @Column({ name: "record_type", length: 30 })
    recordType!: string; // 'consultation', 'procedure', 'lab_result', 'imaging', 'prescription', etc.
    
    @Column({ type: "text", nullable: true })
    diagnosis?: string;
    
    @Column({ type: "text", nullable: true })
    symptoms?: string;
    
    @Column({ type: "text", nullable: true })
    observations?: string;
    
    @Column({ type: "text", nullable: true })
    treatments?: string;
    
    @Column({ name: "is_shared_with_patient", default: true })
    isSharedWithPatient!: boolean; // Para controlar si el paciente puede ver este registro
    
    @Column({ name: "follow_up_date", nullable: true })
    followUpDate?: Date;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @ManyToOne(() => OrganizationEntity)
    @JoinColumn({ name: "organization_id" })
    organization!: OrganizationEntity;
    
    @ManyToOne(() => PatientEntity)
    @JoinColumn({ name: "patient_id" })
    patient!: PatientEntity;
    
    @ManyToOne(() => MedicalPractitionerEntity)
    @JoinColumn({ name: "practitioner_id" })
    practitioner!: MedicalPractitionerEntity;
    
    @ManyToOne(() => AppointmentEntity, { nullable: true })
    @JoinColumn({ name: "appointment_id" })
    appointment?: AppointmentEntity;
    
    @OneToMany(() => MedicalDocumentEntity, document => document.medicalRecord)
    documents!: MedicalDocumentEntity[];
    
    @OneToOne(() => PrescriptionEntity, prescription => prescription.medicalRecord)
    prescription?: PrescriptionEntity;
    
    @OneToOne(() => LabResultEntity, labResult => labResult.medicalRecord)
    labResult?: LabResultEntity;
    
    @OneToOne(() => ImagingStudyEntity, imagingStudy => imagingStudy.medicalRecord)
    imagingStudy?: ImagingStudyEntity;
}

// Documentos médicos (estructura general para archivos)
@Entity({ name: "Medical_Document" })
export class MedicalDocumentEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "medical_record_id" })
    medicalRecordId!: number;
    
    @Column({ length: 100 })
    title!: string;
    
    @Column({ length: 30 })
    type!: string; // 'image', 'pdf', 'document', etc.
    
    @Column({ length: 255 })
    filename!: string; 
    
    @Column({ length: 2083 })
    fileUrl!: string;
    
    @Column({ name: "content_type", length: 100, nullable: true })
    contentType?: string; // MIME type
    
    @Column({ name: "file_size", nullable: true })
    fileSize?: number; // En bytes
    
    @Column({ type: "text", nullable: true })
    description?: string;
    
    @Column({ default: true })
    public!: boolean; // Si el paciente puede verlo
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    // Relaciones
    @ManyToOne(() => MedicalRecordEntity)
    @JoinColumn({ name: "medical_record_id" })
    medicalRecord!: MedicalRecordEntity;
}

// Recetas médicas digitales
@Entity({ name: "Prescription" })
export class PrescriptionEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "medical_record_id" })
    medicalRecordId!: number;
    
    @Column({ name: "prescription_date" })
    prescriptionDate!: Date;
    
    @Column({ name: "expiration_date", nullable: true })
    expirationDate?: Date;
    
    @Column({ name: "has_controlled_substances", default: false })
    hasControlledSubstances!: boolean;
    
    @Column({ name: "electronic_signature_url", length: 2083, nullable: true })
    electronicSignatureUrl?: string;
    
    @Column({ name: "qr_code_url", length: 2083, nullable: true })
    qrCodeUrl?: string; // URL para código QR de verificación
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @OneToOne(() => MedicalRecordEntity)
    @JoinColumn({ name: "medical_record_id" })
    medicalRecord!: MedicalRecordEntity;
    
    @OneToMany(() => MedicationEntity, medication => medication.prescription)
    medications!: MedicationEntity[];
}

// Medicamentos recetados
@Entity({ name: "Medication" })
export class MedicationEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "prescription_id" })
    prescriptionId!: number;
    
    @Column({ length: 100 })
    name!: string;
    
    @Column({ length: 50, nullable: true })
    dosage?: string; // "200mg", "5ml", etc.
    
    @Column({ length: 100, nullable: true })
    frequency?: string; // "Cada 8 horas", "Dos veces al día", etc.
    
    @Column({ length: 50, nullable: true })
    duration?: string; // "7 días", "2 semanas", etc.
    
    @Column({ type: "text", nullable: true })
    instructions?: string;
    
    @Column({ default: false })
    controlled!: boolean; // Si es un medicamento controlado
    
    // Relaciones
    @ManyToOne(() => PrescriptionEntity)
    @JoinColumn({ name: "prescription_id" })
    prescription!: PrescriptionEntity;
}

// Estudios de laboratorio
@Entity({ name: "Lab_Result" })
export class LabResultEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "medical_record_id" })
    medicalRecordId!: number;
    
    @Column({ length: 100 })
    testName!: string;
    
    @Column({ name: "lab_name", length: 100, nullable: true })
    labName?: string;
    
    @Column({ name: "collection_date" })
    collectionDate!: Date;
    
    @Column({ name: "result_date", nullable: true })
    resultDate?: Date;
    
    @Column({ name: "result_summary", type: "text", nullable: true })
    resultSummary?: string;
    
    @Column({ type: "json", nullable: true })
    results?: string; // JSON con los resultados detallados
    
    @Column({ name: "normal_range", length: 255, nullable: true })
    normalRange?: string;
    
    @Column({ length: 50, nullable: true })
    status?: string; // 'pending', 'completed', 'abnormal', etc.
    
    @Column({ name: "doctor_notes", type: "text", nullable: true })
    doctorNotes?: string;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @OneToOne(() => MedicalRecordEntity)
    @JoinColumn({ name: "medical_record_id" })
    medicalRecord!: MedicalRecordEntity;
}

// Estudios de imagen (rayos X, resonancias, etc.)
@Entity({ name: "Imaging_Study" })
export class ImagingStudyEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "medical_record_id" })
    medicalRecordId!: number;
    
    @Column({ length: 100 })
    studyType!: string; // "Rayos X", "Resonancia Magnética", "Tomografía", etc.
    
    @Column({ name: "body_part", length: 100 })
    bodyPart!: string; // "Tórax", "Cráneo", "Extremidad inferior", etc.
    
    @Column({ name: "imaging_facility", length: 100, nullable: true })
    imagingFacility?: string;
    
    @Column({ name: "study_date" })
    studyDate!: Date;
    
    @Column({ name: "report_date", nullable: true })
    reportDate?: Date;
    
    @Column({ type: "text", nullable: true })
    findings?: string;
    
    @Column({ type: "text", nullable: true })
    impression?: string;
    
    @Column({ name: "radiologist_name", length: 100, nullable: true })
    radiologistName?: string;
    
    @Column({ length: 50, nullable: true })
    status?: string; // 'pending', 'completed', etc.
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @OneToOne(() => MedicalRecordEntity)
    @JoinColumn({ name: "medical_record_id" })
    medicalRecord!: MedicalRecordEntity;
    
    @OneToMany(() => ImagingImageEntity, image => image.imagingStudy)
    images!: ImagingImageEntity[];
}

// Imágenes de estudios (puede haber múltiples por estudio)
@Entity({ name: "Imaging_Image" })
export class ImagingImageEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "imaging_study_id" })
    imagingStudyId!: number;
    
    @Column({ length: 100, nullable: true })
    title?: string;
    
    @Column({ length: 2083 })
    imageUrl!: string;
    
    @Column({ length: 50, nullable: true })
    format?: string; // "DICOM", "JPEG", etc.
    
    @Column({ name: "thumbnail_url", length: 2083, nullable: true })
    thumbnailUrl?: string;
    
    @Column({ name: "image_number", nullable: true })
    imageNumber?: number; // Para series de imágenes
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    // Relaciones
    @ManyToOne(() => ImagingStudyEntity)
    @JoinColumn({ name: "imaging_study_id" })
    imagingStudy!: ImagingStudyEntity;
}

// Acceso a historial (para registrar quién accede a los registros médicos)
@Entity({ name: "Medical_Record_Access" })
export class MedicalRecordAccessEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "medical_record_id" })
    medicalRecordId!: number;
    
    @Column({ name: "user_id" })
    userId!: number;
    
    @Column({ name: "access_time" })
    accessTime!: Date;
    
    @Column({ length: 20 })
    action!: string; // 'view', 'download', 'print', etc.
    
    @Column({ length: 45, nullable: true })
    ipAddress?: string;
    
    @Column({ length: 255, nullable: true })
    userAgent?: string;
    
    // Relaciones
    @ManyToOne(() => MedicalRecordEntity)
    @JoinColumn({ name: "medical_record_id" })
    medicalRecord!: MedicalRecordEntity;
    
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;
}