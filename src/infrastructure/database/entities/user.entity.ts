// src/infrastructure/database/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from "typeorm";
import { PatientEntity } from "./patient.entity";
import { MedicalPractitionerEntity } from "./medical-practitioner.entity";
import { UserRoleEntity } from "./user-role.entity";

@Entity({ name: "User" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 80, nullable: false })
    username!: string;

    @Column({ nullable: false })
    password!: string;

    @Column({ unique: true, nullable: false })
    email!: string;

    @Column({ length: 20, unique: true, nullable: false })
    phone!: string;

    @Column({ name: "profile_picture_url", length: 2083, nullable: true })
    profilePictureUrl?: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;

    // Relaciones
    // Un usuario puede tener un paciente asociado
    @OneToOne(() => PatientEntity, patient => patient.user)
    patient?: PatientEntity;

    // Un usuario puede ser un médico
    @OneToOne(() => MedicalPractitionerEntity, medicalPractitioner => medicalPractitioner.user)
    medicalPractitioner?: MedicalPractitionerEntity;

    // Un usuario puede tener varios roles
    @OneToMany(() => UserRoleEntity, userRole => userRole.user)
    userRoles!: UserRoleEntity[];
}