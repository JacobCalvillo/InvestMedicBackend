"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class Staff extends sequelize_1.Model {
}
Staff.init({
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    birth_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: config_1.default,
    tableName: "Staff"
});
exports.default = Staff;
