import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MedicalPractitionerSpecialtyEntity } from "./medical-practitioner-specialty.entity";

@Entity({ name: "Specialty" })
export class SpecialtyEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100, nullable: false })
    name!: string;

    @Column({ length: 100, nullable: true })
    description?: string;

    // Relaciones
    @OneToMany(() => MedicalPractitionerSpecialtyEntity, mps => mps.specialty)
    medicalPractitioners!: MedicalPractitionerSpecialtyEntity[];
}