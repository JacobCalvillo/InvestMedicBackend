"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const Patient_1 = __importDefault(require("./Patient"));
const Service_1 = __importDefault(require("./Service"));
const MedicalPractitioner_1 = __importDefault(require("./MedicalPractitioner"));
const Feedback = config_1.default.define("Feedback", {
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    comments: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient_1.default,
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
    },
    medical_practitioner_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MedicalPractitioner_1.default,
            key: "id"
        }
    }
}, {
    timestamps: true
});
exports.default = Feedback;
