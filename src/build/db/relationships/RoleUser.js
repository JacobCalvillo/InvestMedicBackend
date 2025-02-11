"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Role_1 = __importDefault(require("../models/Role"));
const UserRole_1 = __importDefault(require("../models/UserRole"));
User_1.default.belongsToMany(Role_1.default, {
    through: UserRole_1.default,
    foreignKey: 'user_id'
});
Role_1.default.belongsToMany(User_1.default, {
    through: UserRole_1.default,
    foreignKey: 'role_id'
});
