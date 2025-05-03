// src/infrastructure/database/entities/medical-practitioner-service.entity.ts
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { MedicalPractitionerEntity } from "./medical-practitioner.entity";
import { ServiceEntity } from "./service.entity";

@Entity({ name: "Medical_Practitioner_Service" })
export class MedicalPractitionerServiceEntity {
    @PrimaryColumn({ name: "medical_practitioner_id" })
    medicalPractitionerId!: number;

    @PrimaryColumn({ name: "service_id" })
    serviceId!: number;

    // Relaciones
    @ManyToOne(() => MedicalPractitionerEntity, mp => mp.services)
    @JoinColumn({ name: "medical_practitioner_id" })
    medicalPractitioner!: MedicalPractitionerEntity;

    @ManyToOne(() => ServiceEntity, service => service.medicalPractitionerServices)
    @JoinColumn({ name: "service_id" })
    service!: ServiceEntity;
}