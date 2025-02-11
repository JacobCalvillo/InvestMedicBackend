"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const Specialty_1 = __importDefault(require("./Specialty"));
const MedicalPractitionerSpecialty_1 = __importDefault(require("./MedicalPractitionerSpecialty"));
class MedicalPractitioner extends sequelize_1.Model {
}
MedicalPractitioner.init({
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    birth_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "Medical_Practitioner",
    timestamps: true,
    sequelize: config_1.default
});
MedicalPractitioner.belongsToMany(Specialty_1.default, {
    through: MedicalPractitionerSpecialty_1.default,
    foreignKey: 'medical_practitioner_id'
});
exports.default = MedicalPractitioner;
