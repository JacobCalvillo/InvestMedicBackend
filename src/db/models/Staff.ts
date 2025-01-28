import { DataTypes, Model } from "sequelize";
import  db  from "../config";
import User from "./User";

class Staff extends Model {}

Staff.init(
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }, 
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true,
        sequelize: db,
        tableName: "Staff"
    }
)

export default Staff;