"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class Role extends sequelize_1.Model {
}
Role.init({
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true,
    sequelize: config_1.default,
    tableName: "Roles"
});
exports.default = Role;
