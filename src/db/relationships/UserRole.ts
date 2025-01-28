import Role from "../models/Role"
import User from "../models/User"

Role.belongsToMany(User, {through: "User_Role"})