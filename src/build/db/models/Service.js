"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class Service extends sequelize_1.Model {
}
Service.init({
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    image_url: {
        type: sequelize_1.DataTypes.STRING(2083),
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: "Service",
    sequelize: config_1.default
});
exports.default = Service;
