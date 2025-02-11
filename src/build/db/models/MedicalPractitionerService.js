"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const sequelize_1 = require("sequelize");
class MedicalPractitionerService extends sequelize_1.Model {
}
MedicalPractitionerService.init({}, {
    timestamps: true,
    tableName: "Medical_Practitioner_Service",
    sequelize: config_1.default
});
exports.default = MedicalPractitionerService;
