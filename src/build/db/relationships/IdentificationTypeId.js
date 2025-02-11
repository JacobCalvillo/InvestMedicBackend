"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IdentificationUser_1 = __importDefault(require("../models/IdentificationUser"));
const IdentificationType_1 = __importDefault(require("../models/IdentificationType"));
IdentificationUser_1.default.belongsTo(IdentificationType_1.default, {
    foreignKey: 'identificationTypeId',
    as: 'identificationType'
});
IdentificationType_1.default.hasMany(IdentificationUser_1.default, {
    foreignKey: 'identificationTypeId',
    as: 'identificationUser'
});
