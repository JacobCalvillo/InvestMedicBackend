"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MedicalPractitionerService_1 = __importDefault(require("../models/MedicalPractitionerService"));
const MedicalPractitioner_1 = __importDefault(require("../models/MedicalPractitioner"));
const Service_1 = __importDefault(require("../models/Service"));
Service_1.default.belongsToMany(MedicalPractitioner_1.default, {
    through: MedicalPractitionerService_1.default,
    foreignKey: 'service_id'
});
MedicalPractitioner_1.default.belongsToMany(Service_1.default, {
    through: MedicalPractitionerService_1.default,
    foreignKey: 'medical_practitioner_id'
});
