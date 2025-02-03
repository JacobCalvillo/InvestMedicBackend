"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const User_1 = __importDefault(require("./User"));
const AuditLog = config_1.default.define("AuditLog", {
    action: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    table_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default,
            key: "id"
        }
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    }
}, {
    timestamps: false,
    tableName: "Audit_Log"
});
exports.default = AuditLog;
