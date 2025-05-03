// src/infrastructure/database/entities/payment-method.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PaymentEntity } from "./payment.entity";

@Entity({ name: "Payment_Method" })
export class PaymentMethodEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50, nullable: false })
    name!: string;

    // Relaciones
    @OneToMany(() => PaymentEntity, payment => payment.paymentMethod)
    payments!: PaymentEntity[];
}