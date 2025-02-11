"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MedicalPractitioner_1 = __importDefault(require("../models/MedicalPractitioner"));
const Appointment_1 = __importDefault(require("../models/Appointment"));
MedicalPractitioner_1.default.hasMany(Appointment_1.default, {
    foreignKey: {
        name: "medical_practitioner_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
