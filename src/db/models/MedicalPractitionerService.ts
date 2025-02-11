import db from "../config";
import { Model } from "sequelize";

class MedicalPractitionerService extends Model { }

MedicalPractitionerService.init(
    {},
    {
        timestamps: true,
        tableName: "Medical_Practitioner_Service",
        sequelize: db
    }
)

export default MedicalPractitionerService;