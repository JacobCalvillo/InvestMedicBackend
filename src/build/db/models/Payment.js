"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const PaymentMethod_1 = __importDefault(require("./PaymentMethod"));
const Invoice_1 = __importDefault(require("./Invoice"));
const Patient_1 = __importDefault(require("./Patient"));
class Payment extends sequelize_1.Model {
}
Payment.init({
    stripe_payment_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    currency: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: false
    },
    method_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PaymentMethod_1.default,
            key: "id"
        }
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient_1.default,
            key: "id"
        }
    },
    invoice_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Invoice_1.default,
            key: "id"
        }
    }
}, {
    timestamps: true,
    tableName: "Payment",
    sequelize: config_1.default
});
Payment.belongsTo(PaymentMethod_1.default, {
    foreignKey: {
        name: "method_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
exports.default = Payment;
