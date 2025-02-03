import db from "../config";
import { Model, DataTypes } from "sequelize";
import IdentificationUser from "./IdentificationUser";

class IdentificationType extends Model {}

IdentificationType.init(
    {
        type: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: "Identification_type",
        sequelize: db
    }
)



export default IdentificationType;