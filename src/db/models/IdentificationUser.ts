import { DataTypes, Model } from "sequelize";
import db from "../config"; 
import IdentificationType from "./IdentificationType";

class IdentificationUser extends Model {}

IdentificationUser.init(
    {
        number: {
            type: DataTypes.STRING(100),
            unique: true
        },
        identificationDocumentUrl: {
            type: DataTypes.STRING(2083),
            allowNull: true
        },
        identificationTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: IdentificationType,
                key: "id"
            }
        }
    },
    {
        timestamps: true,
        tableName: "IdentificationUser",
        sequelize: db,
        underscored: true
    }
)


export default IdentificationUser;