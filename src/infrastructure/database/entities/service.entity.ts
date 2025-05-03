import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AppointmentEntity } from "./appointment.entity";
import { MedicalPractitionerServiceEntity } from "./medical-practitioner-service.entity";
import { InvoiceDetailsEntity } from "./invoice-details.entity";

@Entity({ name: "Service" })
export class ServiceEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100, nullable: false })
    name!: string;

    @Column({ length: 100, nullable: true })
    description?: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price!: number;

    @Column({ name: "image_url", length: 2083, nullable: true })
    imageUrl?: string;

    @Column({ name: "stripe_price_id", nullable: true })
    stripePriceId?: string;

    @Column({ name: "stripe_product_id", nullable: true })
    stripeProductId?: string;

    // Relaciones
    @OneToMany(() => AppointmentEntity, appointment => appointment.service)
    appointments!: AppointmentEntity[];

    @OneToMany(() => MedicalPractitionerServiceEntity, mps => mps.service)
    medicalPractitionerServices!: MedicalPractitionerServiceEntity[];

    @OneToMany(() => InvoiceDetailsEntity, invoiceDetail => invoiceDetail.service)
    invoiceDetails!: InvoiceDetailsEntity[];
}