import { DataTypes, Model } from "sequelize";
import db  from "../config";
import Patient from "./Patient";

class Gender extends Model {}

Gender.init(
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
        modelName: "Gender",
    }
)

export default Gender;