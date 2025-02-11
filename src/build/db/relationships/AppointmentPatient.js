"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Appointment_1 = __importDefault(require("../models/Appointment"));
const Patient_1 = __importDefault(require("../models/Patient"));
Appointment_1.default.belongsTo(Patient_1.default, {
    foreignKey: {
        name: "patient_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
