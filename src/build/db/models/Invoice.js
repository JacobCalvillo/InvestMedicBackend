"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const Patient_1 = __importDefault(require("./Patient"));
const Status_1 = __importDefault(require("./Status"));
class Invoice extends sequelize_1.Model {
}
Invoice.init({
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient_1.default,
            key: "id"
        }
    },
    total_amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status_1.default,
            key: "id"
        }
    },
    issue_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    due_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: "Invoice",
    sequelize: config_1.default
});
Invoice.belongsTo(Status_1.default, {
    foreignKey: {
        name: "status_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
exports.default = Invoice;
