import { DataTypes, Model } from "sequelize";
import db  from "../config";
import MedicalPractitioner from "./MedicalPractitioner";

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


Specialty.belongsToMany(MedicalPractitioner, {
    through: "Medical_Practitioner_Specialty"
})

export default Specialty;