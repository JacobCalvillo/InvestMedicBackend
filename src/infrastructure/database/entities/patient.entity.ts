
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { AppointmentEntity } from "./appointment.entity";
import { MedicalHistoryEntity } from "./medical-history.entity";
import { PatientInsuranceEntity } from "./patient-insurance.entity";
import { PatientIdentificationEntity } from "./patient-identification.entity";

@Entity({ name: "Patient" })
export class PatientEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 40, nullable: false })
    name!: string;

    @Column({ name: "last_name", length: 50, nullable: false })
    lastName!: string;

    @Column({ name: "birth_date", type: "date", nullable: false })
    birthDate!: Date;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    weight?: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    height?: number;

    @Column({ length: 15, nullable: true })
    gender?: string;

    @Column({ length: 100, nullable: true })
    street?: string;

    @Column({ length: 50, nullable: true })
    city?: string;

    @Column({ length: 50, nullable: true })
    state?: string;

    @Column({ name: "postal_code", length: 10, nullable: true })
    postalCode?: string;

    @Column({ length: 50, nullable: true })
    occupation?: string;

    @Column({ name: "emergency_contact_name", length: 40, nullable: true })
    emergencyContactName?: string;

    @Column({ name: "emergency_contact_last_name", length: 50, nullable: true })
    emergencyContactLastName?: string;

    @Column({ name: "emergency_contact_relationship", length: 20, nullable: true })
    emergencyContactRelationship?: string;

    @Column({ name: "emergency_contact_phone", length: 20, nullable: true })
    emergencyContactPhone?: string;

    @Column({ name: "marital_status", length: 20, nullable: true })
    maritalStatus?: string;

    @Column({ name: "privacy_consent", default: true })
    privacyConsent!: boolean;

    @Column({ name: "user_id" })
    userId!: number;

    // Relaciones
    @OneToOne(() => UserEntity)
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;

    @OneToMany(() => AppointmentEntity, appointment => appointment.patient)
    appointments!: AppointmentEntity[];

    @OneToMany(() => MedicalHistoryEntity, medicalHistory => medicalHistory.patient)
    medicalHistory!: MedicalHistoryEntity[];

    @OneToMany(() => PatientInsuranceEntity, patientInsurance => patientInsurance.patient)
    insurances!: PatientInsuranceEntity[];

    @OneToMany(() => PatientIdentificationEntity, patientIdentification => patientIdentification.patient)
    identifications!: PatientIdentificationEntity[];
}