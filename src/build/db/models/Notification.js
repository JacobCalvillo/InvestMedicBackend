"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const User_1 = __importDefault(require("./User"));
class Notification extends sequelize_1.Model {
}
Notification.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default,
            key: "id"
        }
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    sent_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    is_read: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: "Notification",
    sequelize: config_1.default
});
exports.default = Notification;
