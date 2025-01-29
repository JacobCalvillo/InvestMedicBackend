import { DataTypes, Model } from "sequelize";
import db  from "../config";
import MedicalPractitioner from "./MedicalPractitioner";
import MedicalPractitionerSpecialty from "./MedicalPractitionerSpecialty";

class Specialty extends Model {}

Specialty.init(
    {
        name:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: "Specialty",
        sequelize: db
    }
)




export default Specialty;