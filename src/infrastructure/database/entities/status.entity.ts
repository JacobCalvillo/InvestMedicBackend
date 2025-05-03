import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AppointmentEntity } from "./appointment.entity";
import { InvoiceEntity } from "./invoice.entity";

@Entity({ name: "Status" })
export class StatusEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50, nullable: false })
    name!: string;

    // Relaciones
    @OneToMany(() => AppointmentEntity, appointment => appointment.status)
    appointments!: AppointmentEntity[];

    @OneToMany(() => InvoiceEntity, invoice => invoice.status)
    invoices!: InvoiceEntity[];
}