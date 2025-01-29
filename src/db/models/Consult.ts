import { DataTypes, Model } from "sequelize";
import db from "../config";
import Appointment from "./Appointment";

class Consult extends Model {}

Consult.init(
    {
        diagnosis: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        appointment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Appointment,
                key: "id"
            }
        }
    },
    {
        timestamps: true,
        tableName: "Consult",
        sequelize: db
    }
)


export default Consult;