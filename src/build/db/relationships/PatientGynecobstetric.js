"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Patient_1 = __importDefault(require("../models/Patient"));
const Insurance_1 = __importDefault(require("../models/Insurance"));
Insurance_1.default.hasMany(Patient_1.default, {
    foreignKey: {
        name: "insurance_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
});
