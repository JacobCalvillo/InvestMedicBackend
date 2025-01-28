import { DataTypes, Model } from "sequelize";
import db from "../config"; 

class Identification extends Model {}

Identification.init(
    {
        type: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        number: {
            type: DataTypes.STRING(100),
            unique: true
        },
        identification_document_url: {
            type: DataTypes.STRING(2083),
            allowNull: true
        }
    },
    {
        timestamps: true,
        tableName: "Identification",
        sequelize: db
    }
)



export default Identification;