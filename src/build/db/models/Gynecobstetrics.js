"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class Gynecobstetrics extends sequelize_1.Model {
}
Gynecobstetrics.init({
    pregnancies: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    births: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    cesarean_sections: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    misbirths: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    last_date_of_menstruation: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    contraceptive_methods: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    }
}, {
    timestamps: true,
    tableName: "Gynecobstetrics",
    sequelize: config_1.default
});
exports.default = Gynecobstetrics;
