import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { MedicalPractitionerEntity } from "./medical-practitioner.entity";
import { SpecialtyEntity } from "./specialty.entity";

@Entity({ name: "Medical_Practitioner_Specialty" })
export class MedicalPractitionerSpecialtyEntity {
    @PrimaryColumn({ name: "medical_practitioner_id" })
    medicalPractitionerId!: number;

    @PrimaryColumn({ name: "specialty_id" })
    specialtyId!: number;

    // Relaciones
    @ManyToOne(() => MedicalPractitionerEntity, mp => mp.specialties)
    @JoinColumn({ name: "medical_practitioner_id" })
    medicalPractitioner!: MedicalPractitionerEntity;

    @ManyToOne(() => SpecialtyEntity, specialty => specialty.medicalPractitioners)
    @JoinColumn({ name: "specialty_id" })
    specialty!: SpecialtyEntity;
}