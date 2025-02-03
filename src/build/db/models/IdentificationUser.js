"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const IdentificationType_1 = __importDefault(require("./IdentificationType"));
class IdentificationUser extends sequelize_1.Model {
}
IdentificationUser.init({
    number: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true
    },
    identificationDocumentUrl: {
        type: sequelize_1.DataTypes.STRING(2083),
        allowNull: true
    },
    identificationTypeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: IdentificationType_1.default,
            key: "id"
        }
    }
}, {
    timestamps: true,
    tableName: "IdentificationUser",
    sequelize: config_1.default,
    underscored: true
});
exports.default = IdentificationUser;
