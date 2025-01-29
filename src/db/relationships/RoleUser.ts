import User from "../models/User";
import Role from "../models/Role";
import UserRole from "../models/UserRole";

User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'user_id'
})

Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'role_id'
})