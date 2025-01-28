import { DataTypes, Model } from "sequelize";
import db from "../config";

class MedicalPractitioner extends Model {}

MedicalPractitioner.init(
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
        tableName: "Medical_Practitioner",
        timestamps: true,
        sequelize: db
    }
)




export default MedicalPractitioner;