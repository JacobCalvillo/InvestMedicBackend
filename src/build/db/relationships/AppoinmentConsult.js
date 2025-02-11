"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Consult_1 = __importDefault(require("../models/Consult"));
const Appointment_1 = __importDefault(require("../models/Appointment"));
Consult_1.default.belongsTo(Appointment_1.default, {
    foreignKey: {
        name: "appointment_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
Appointment_1.default.hasOne(Consult_1.default, {
    foreignKey: {
        name: "appointment_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
