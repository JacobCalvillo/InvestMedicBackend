"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("../models/Service"));
const Appointment_1 = __importDefault(require("../models/Appointment"));
Service_1.default.hasMany(Appointment_1.default, {
    foreignKey: {
        name: "service_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
