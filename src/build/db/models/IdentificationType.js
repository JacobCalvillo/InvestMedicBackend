"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const sequelize_1 = require("sequelize");
class IdentificationType extends sequelize_1.Model {
}
IdentificationType.init({
    type: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: "Identification_type",
    sequelize: config_1.default
});
exports.default = IdentificationType;
