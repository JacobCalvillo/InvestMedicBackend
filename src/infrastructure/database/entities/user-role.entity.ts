import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { RoleEntity } from "./role.entity";

@Entity({ name: "User_Role" })
export class UserRoleEntity {
    @PrimaryColumn({ name: "user_id" })
    userId!: number;

    @PrimaryColumn({ name: "role_id" })
    roleId!: number;

    // Relaciones
    @ManyToOne(() => UserEntity, user => user.userRoles)
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;

    @ManyToOne(() => RoleEntity, role => role.userRoles)
    @JoinColumn({ name: "role_id" })
    role!: RoleEntity;
}