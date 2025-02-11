"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const Appointment_1 = __importDefault(require("./Appointment"));
class Consult extends sequelize_1.Model {
}
Consult.init({
    diagnosis: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    appointment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Appointment_1.default,
            key: "id"
        }
    }
}, {
    timestamps: true,
    tableName: "Consult",
    sequelize: config_1.default
});
exports.default = Consult;
