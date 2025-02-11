import { DataTypes, Model } from "sequelize";
import db from "../config";
import Specialty from "./Specialty";
import MedicalPractitionerSpecialty from "./MedicalPractitionerSpecialty";

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

MedicalPractitioner.belongsToMany(Specialty, {
    through: MedicalPractitionerSpecialty,
    foreignKey: 'medical_practitioner_id'
})


export default MedicalPractitioner;