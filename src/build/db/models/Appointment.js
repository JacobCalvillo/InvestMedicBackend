"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const Patient_1 = __importDefault(require("./Patient"));
const MedicalPractitioner_1 = __importDefault(require("./MedicalPractitioner"));
const Service_1 = __importDefault(require("./Service"));
const Consult_1 = __importDefault(require("./Consult"));
const Status_1 = __importDefault(require("./Status"));
class Appointment extends sequelize_1.Model {
}
Appointment.init({
    schedule: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    reason: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    status_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status_1.default,
            key: "id"
        }
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient_1.default,
            key: "id"
        }
    },
    medical_practitioner_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MedicalPractitioner_1.default,
            key: "id"
        }
    },
    service_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Service_1.default,
            key: "id"
        }
    }
}, {
    timestamps: true,
    tableName: "Appointment",
    sequelize: config_1.default
});
Appointment.belongsTo(MedicalPractitioner_1.default, {
    foreignKey: {
        name: "medical_practitioner_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
Appointment.belongsTo(Service_1.default, {
    foreignKey: {
        name: "service_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
Appointment.hasOne(Consult_1.default, {
    foreignKey: {
        name: "appointment_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
exports.default = Appointment;
