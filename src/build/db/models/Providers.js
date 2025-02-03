"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class Providers extends sequelize_1.Model {
}
Providers.init({
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
    sequelize: config_1.default,
    tableName: "Providers"
});
exports.default = Providers;
