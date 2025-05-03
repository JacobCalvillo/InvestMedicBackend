import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserRoleEntity } from "./user-role.entity";

@Entity({ name: "Role" })
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50, nullable: false })
    name!: string;

    // Relaciones
    @OneToMany(() => UserRoleEntity, userRole => userRole.role)
    userRoles!: UserRoleEntity[];
}