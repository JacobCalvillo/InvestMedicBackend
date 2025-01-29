import { DataTypes, Model } from "sequelize";
import db  from "../config";
import PaymentMethod from "./PaymentMethod";
import Invoice from "./Invoice";
import Patient from "./Patient";

class Payment extends Model {}

Payment.init(
    {
        stripe_payment_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        method_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: PaymentMethod,
                key: "id"
            }
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Patient,
                key: "id"
            }
        },  
        invoice_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Invoice,
                key: "id"
            }
        }
    },
    {
        timestamps: true,
        tableName: "Payment",
        sequelize: db
    }
)


Payment.belongsTo(PaymentMethod, {
    foreignKey: {
        name: "method_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})


export default Payment;