"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MedicalPractitioner_1 = __importDefault(require("../models/MedicalPractitioner"));
const User_1 = __importDefault(require("../models/User"));
MedicalPractitioner_1.default.belongsTo(User_1.default, {
    foreignKey: {
        name: "user_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
