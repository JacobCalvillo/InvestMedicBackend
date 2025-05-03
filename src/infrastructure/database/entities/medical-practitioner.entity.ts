// src/infrastructure/database/entities/medical-practitioner.entity.ts
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne} from "typeorm";
import { UserEntity } from "./user.entity";
import { AppointmentEntity } from "./appointment.entity";
import { MedicalPractitionerSpecialtyEntity } from "./medical-practitioner-specialty.entity";
import { MedicalPractitionerServiceEntity } from "./medical-practitioner-service.entity";
import { MedicalPractitionerAvailabilityEntity } from "./medical-practitioner-availability.entity";

@Entity({ name: "Medical_Practitioner" })
export class MedicalPractitionerEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50, nullable: false })
    name!: string;

    @Column({ name: "last_name", length: 50, nullable: false })
    lastName!: string;

    @Column({ name: "birth_date", type: "date", nullable: false })
    birthDate!: Date;

    @Column({ name: "user_id" })
    userId!: number;

    // Relaciones
    @OneToOne(() => UserEntity)
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;

    @OneToMany(() => AppointmentEntity, appointment => appointment.medicalPractitioner)
    appointments!: AppointmentEntity[];

    @OneToMany(() => MedicalPractitionerSpecialtyEntity, mps => mps.medicalPractitioner)
    specialties!: MedicalPractitionerSpecialtyEntity[];

    @OneToMany(() => MedicalPractitionerServiceEntity, mps => mps.medicalPractitioner)
    services!: MedicalPractitionerServiceEntity[];

    @OneToMany(() => MedicalPractitionerAvailabilityEntity, mpa => mpa.medicalPractitioner)
    availabilities!: MedicalPractitionerAvailabilityEntity[];
}