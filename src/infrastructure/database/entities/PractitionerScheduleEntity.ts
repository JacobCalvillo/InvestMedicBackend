// Disponibilidad del médico
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { MedicalPractitionerEntity } from "./MedicalPractitionerEntity";

@Entity({ name: "Practitioner_Schedule" })
export class PractitionerScheduleEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "practitioner_id" })
    practitionerId!: number;
    
    @Column({ name: "day_of_week" })
    dayOfWeek!: number; // 0-6 (Domingo a Sábado)
    
    @Column({ name: "start_time" })
    startTime!: string; // HH:MM formato 24h
    
    @Column({ name: "end_time" })
    endTime!: string; // HH:MM formato 24h
    
    @Column({ default: true })
    isActive!: boolean;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @ManyToOne(() => MedicalPractitionerEntity)
    @JoinColumn({ name: "practitioner_id" })
    practitioner!: MedicalPractitionerEntity;
}

// Excepciones de disponibilidad (vacaciones, días libres, etc.)
@Entity({ name: "Schedule_Exception" })
export class ScheduleExceptionEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "practitioner_id" })
    practitionerId!: number;
    
    @Column({ name: "exception_date" })
    exceptionDate!: Date;
    
    @Column({ name: "start_time", nullable: true })
    startTime?: string; // Si es null, todo el día está bloqueado
    
    @Column({ name: "end_time", nullable: true })
    endTime?: string;
    
    @Column({ length: 100, nullable: true })
    reason?: string;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    // Relaciones
    @ManyToOne(() => MedicalPractitionerEntity)
    @JoinColumn({ name: "practitioner_id" })
    practitioner!: MedicalPractitionerEntity;
}