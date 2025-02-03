"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class MaritalStatus extends sequelize_1.Model {
}
MaritalStatus.init({
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true,
    tableName: "Marital_Status",
    sequelize: config_1.default
});
exports.default = MaritalStatus;
