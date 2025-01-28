import { DataTypes, Model } from "sequelize";
import db from "../config";

class Role extends Model {}

Role.init(
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: true,
        sequelize: db,
        tableName: "Roles"
    }
)


export default Role;