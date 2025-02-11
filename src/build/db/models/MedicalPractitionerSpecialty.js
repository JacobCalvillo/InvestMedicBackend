"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class MedicalPractitionerSpecialty extends sequelize_1.Model {
}
MedicalPractitionerSpecialty.init({}, {
    timestamps: true,
    tableName: "Medical_Practitioner_Specialty",
    sequelize: config_1.default
});
exports.default = MedicalPractitionerSpecialty;
