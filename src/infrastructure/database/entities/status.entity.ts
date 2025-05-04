import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AppointmentEntity } from "./AppointmentEntity";

@Entity({ name: "Status" })
export class StatusEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50, nullable: false })
    name!: string;

    // Relaciones
    @OneToMany(() => AppointmentEntity, appointment => appointment.status)
    appointments!: AppointmentEntity[];

}