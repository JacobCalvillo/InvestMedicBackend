// src/infrastructure/database/entities/consult.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { AppointmentEntity } from "./appointment.entity";

@Entity({ name: "Consult" })
export class ConsultEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text", nullable: true })
    diagnosis?: string;

    @Column({ type: "text", nullable: true })
    notes?: string;

    @Column({ name: "appointment_id" })
    appointmentId!: number;

    // Relaciones
    @ManyToOne(() => AppointmentEntity, appointment => appointment.consults)
    @JoinColumn({ name: "appointment_id" })
    appointment!: AppointmentEntity;
}