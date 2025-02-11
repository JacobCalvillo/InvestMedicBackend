import { Model } from "sequelize";
import db from '../config';

class MedicalPractitionerSpecialty extends Model {}

MedicalPractitionerSpecialty.init(
    {},
    {
        timestamps: true,
        tableName: "Medical_Practitioner_Specialty",
        sequelize: db
    }
)

export default MedicalPractitionerSpecialty;