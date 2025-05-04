// Notificaciones
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { OrganizationEntity } from "./OrganizationEntity"
import { UserEntity } from "./UserEntity"

@Entity({ name: "Notification" })
export class NotificationEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ name: "organization_id" })
    organizationId!: number;
    
    @Column({ name: "user_id" })
    userId!: number;
    
    @Column({ length: 100 })
    title!: string;
    
    @Column({ type: "text" })
    message!: string;
    
    @Column({ length: 30 })
    type!: string; // 'appointment', 'payment', 'system', etc.
    
    @Column({ name: "related_entity", length: 30, nullable: true })
    relatedEntity?: string; // 'appointment', 'payment', etc.
    
    @Column({ name: "related_entity_id", nullable: true })
    relatedEntityId?: number;
    
    @Column({ name: "is_read", default: false })
    isRead!: boolean;
    
    @Column({ name: "read_at", nullable: true })
    readAt?: Date;
    
    @Column({ name: "sent_at" })
    sentAt!: Date;
    
    // Relaciones
    @ManyToOne(() => OrganizationEntity)
    @JoinColumn({ name: "organization_id" })
    organization!: OrganizationEntity;
    
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;
}