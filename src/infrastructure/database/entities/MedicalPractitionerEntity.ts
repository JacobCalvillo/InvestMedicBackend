// Médicos
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { UserEntity } from "./UserEntity";
import { OrganizationEntity } from "./OrganizationEntity";
import { PractitionerScheduleEntity } from "./PractitionerScheduleEntity";
import { AppointmentEntity } from "./AppointmentEntity";
import { ServiceEntity } from "./ServiceEntity";

@Entity({ name: "Medical_Practitioner" })
export class MedicalPractitionerEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "user_id" })
    userId!: number;
    
    @Column({ name: "organization_id" })
    organizationId!: number;
    
    @Column({ length: 50 })
    name!: string;
    
    @Column({ name: "last_name", length: 50 })
    lastName!: string;
    
    @Column({ length: 100, nullable: true })
    title?: string; // "Dr.", "Dra.", etc.
    
    @Column({ name: "license_number", length: 50, nullable: true })
    licenseNumber?: string;
    
    @Column({ name: "professional_statement", type: "text", nullable: true })
    professionalStatement?: string;
    
    @Column({ name: "profile_image_url", length: 2083, nullable: true })
    profileImageUrl?: string;
    
    @Column({ name: "is_active", default: true })
    isActive!: boolean;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @OneToOne(() => UserEntity)
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;
    
    @ManyToOne(() => OrganizationEntity)
    @JoinColumn({ name: "organization_id" })
    organization!: OrganizationEntity;
    
    @OneToMany(() => PractitionerScheduleEntity, schedule => schedule.practitioner)
    schedules!: PractitionerScheduleEntity[];
    
    @OneToMany(() => AppointmentEntity, appointment => appointment.practitioner)
    appointments!: AppointmentEntity[];
    
    @ManyToMany(() => ServiceEntity, service => service.practitioners)
    services!: ServiceEntity[];
    
    @ManyToMany(() => SpecialtyEntity)
    @JoinTable({
        name: "Practitioner_Specialty",
        joinColumn: { name: "practitioner_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "specialty_id", referencedColumnName: "id" }
    })
    specialties!: SpecialtyEntity[];
}

// Especialidades médicas
@Entity({ name: "Specialty" })
export class SpecialtyEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "organization_id" })
    organizationId!: number;
    
    @Column({ length: 100 })
    name!: string;
    
    @Column({ type: "text", nullable: true })
    description?: string;
    
    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
    
    // Relaciones
    @ManyToOne(() => OrganizationEntity)
    @JoinColumn({ name: "organization_id" })
    organization!: OrganizationEntity;
    
    @ManyToMany(() => MedicalPractitionerEntity)
    practitioners!: MedicalPractitionerEntity[];
}