// src/infrastructure/database/entities/appointment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { PatientEntity } from "./patient.entity";
import { MedicalPractitionerEntity } from "./medical-practitioner.entity";
import { ServiceEntity } from "./service.entity";
import { StatusEntity } from "./status.entity";
import { ConsultEntity } from "./consult.entity";

@Entity({ name: "Appointment" })
export class AppointmentEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "start_time", type: "timestamp", nullable: false })
    startTime!: Date;

    @Column({ name: "end_time", type: "timestamp", nullable: false })
    endTime!: Date;

    @Column({ type: "text", nullable: true })
    reason?: string;

    @Column({ name: "status_id" })
    statusId!: number;

    @Column({ name: "patient_id" })
    patientId!: number;

    @Column({ name: "medical_practitioner_id" })
    medicalPractitionerId!: number;

    @Column({ name: "service_id" })
    serviceId!: number;

    // Relaciones
    @ManyToOne(() => StatusEntity, status => status.appointments)
    @JoinColumn({ name: "status_id" })
    status!: StatusEntity;

    @ManyToOne(() => PatientEntity, patient => patient.appointments)
    @JoinColumn({ name: "patient_id" })
    patient!: PatientEntity;

    @ManyToOne(() => MedicalPractitionerEntity, medicalPractitioner => medicalPractitioner.appointments)
    @JoinColumn({ name: "medical_practitioner_id" })
    medicalPractitioner!: MedicalPractitionerEntity;

    @ManyToOne(() => ServiceEntity, service => service.appointments)
    @JoinColumn({ name: "service_id" })
    service!: ServiceEntity;

    @OneToMany(() => ConsultEntity, consult => consult.appointment)
    consults!: ConsultEntity[];
}