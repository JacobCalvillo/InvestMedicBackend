import { DataTypes, Model } from "sequelize";
import db from "../config";

class MaritalStatus extends Model {}

MaritalStatus.init(
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: true,
        tableName: "Marital_Status",
        sequelize: db
    }
)

export default MaritalStatus;