import { DataTypes, Model } from "sequelize";
import db from "../config";

class Insurance extends Model {}

Insurance.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: true,
        tableName: "Insurance",
        sequelize: db
    }
)


export default Insurance;