// Citas
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { OrganizationEntity } from "./OrganizationEntity";
import { PatientEntity } from "./PatientEntity";
import { MedicalPractitionerEntity } from "./MedicalPractitionerEntity";
import { ServiceEntity } from "./ServiceEntity";
import { MedicalRecordEntity } from "./MedicalRecordEntity";
import { PaymentEntity } from "./PaymentEntity";

@Entity({ name: "Appointment" })
export class AppointmentEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "organization_id" })
    organizationId!: number;
    
    @Column({ name: "patient_id" })
    patientId!: number;
    
    @Column({ name: "practitioner_id" })
    practitionerId!: number;
    
    @Column({ name: "service_id", nullable: true })
    serviceId?: number;
    
    @Column({ name: "start_time" })
    startTime!: Date;
    
    @Column({ name: "end_time" })
    endTime!: Date;
    
    @Column({ length: 30 })
    status!: string; // 'scheduled', 'completed', 'cancelled', 'no_show', etc.
    
    @Column({ type: "text", nullable: true })
    reason?: string;
    
    @Column({ name: "cancellation_reason", type: "text", nullable: true })
    cancellationReason?: string;
    
    @Column({ name: "cancellation_date", nullable: true })
    cancellationDate?: Date;
    
    @Column({ name: "reminder_sent", default: false })
    reminderSent!: boolean;
    
    @Column({ name: "payment_status", length: 20, nullable: true })
    paymentStatus?: string; // 'pending', 'paid', 'refunded', etc.
    
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
    
    @ManyToOne(() => ServiceEntity, { nullable: true })
    @JoinColumn({ name: "service_id" })
    service?: ServiceEntity;
    
    @OneToMany(() => MedicalRecordEntity, record => record.appointment)
    medicalRecords!: MedicalRecordEntity[];
    
    @OneToOne(() => PaymentEntity, payment => payment.appointment)
    payment?: PaymentEntity;
}