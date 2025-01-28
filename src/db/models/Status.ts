import { DataTypes, Model } from "sequelize";
import db  from "../config";

class Status extends Model {}

Status.init(
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: true,
        tableName: "Status",
        sequelize: db

    }
)


export default Status;