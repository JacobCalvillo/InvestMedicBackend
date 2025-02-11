"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const MedicalPractitioner_1 = __importDefault(require("./MedicalPractitioner"));
const Staff_1 = __importDefault(require("./Staff"));
const Role_1 = __importDefault(require("./Role"));
class User extends sequelize_1.Model {
}
User.init({
    username: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    profile_picture_url: {
        type: sequelize_1.DataTypes.STRING(2083),
        allowNull: true
    },
}, {
    sequelize: config_1.default,
    timestamps: true,
    modelName: "User"
});
User.hasOne(MedicalPractitioner_1.default, {
    foreignKey: {
        name: 'user_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
User.hasOne(Staff_1.default, {
    foreignKey: {
        name: 'user_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
User.belongsToMany(Role_1.default, { through: "User_Role" });
exports.default = User;
