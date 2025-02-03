"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Consent_1 = __importDefault(require("../models/Consent"));
const Patient_1 = __importDefault(require("../models/Patient"));
Consent_1.default.belongsToMany(Patient_1.default, {
    through: "Patient_Consent",
});
