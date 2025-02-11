"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class UserRole extends sequelize_1.Model {
}
UserRole.init({}, {
    sequelize: config_1.default,
    tableName: 'User_Role',
    timestamps: false
});
exports.default = UserRole;
