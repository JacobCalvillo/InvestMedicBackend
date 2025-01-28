import { DataTypes, Model } from "sequelize";
import db from "../config";

class PaymentMethod extends Model {}

PaymentMethod.init(
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: true,
        tableName: "Payment_Method",
        sequelize: db
    }
)

export default PaymentMethod;