import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { MedicalPractitionerEntity } from "./medical-practitioner.entity";

@Entity({ name: "Medical_Practitioner_Availability" })
export class MedicalPractitionerAvailabilityEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "medical_practitioner_id" })
    medicalPractitionerId!: number;

    @Column({ name: "day_of_week", length: 15 })
    dayOfWeek!: string;

    @Column({ name: "start_time", type: "time" })
    startTime!: string;

    @Column({ name: "end_time", type: "time" })
    endTime!: string;

    // Relaciones
    @ManyToOne(() => MedicalPractitionerEntity, mp => mp.availabilities)
    @JoinColumn({ name: "medical_practitioner_id" })
    medicalPractitioner!: MedicalPractitionerEntity;
}