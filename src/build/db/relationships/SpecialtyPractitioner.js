"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Specialty_1 = __importDefault(require("../models/Specialty"));
const MedicalPractitioner_1 = __importDefault(require("../models/MedicalPractitioner"));
const MedicalPractitionerSpecialty_1 = __importDefault(require("../models/MedicalPractitionerSpecialty"));
Specialty_1.default.belongsToMany(MedicalPractitioner_1.default, {
    through: MedicalPractitionerSpecialty_1.default,
    foreignKey: 'specialty_id'
});
