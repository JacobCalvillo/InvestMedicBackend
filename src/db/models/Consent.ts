import { DataTypes, Model } from "sequelize";
import db from "../config";

class Consent extends Model {}

Consent.init(
    {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: "Consent",
        sequelize: db
    }
)

export default Consent;