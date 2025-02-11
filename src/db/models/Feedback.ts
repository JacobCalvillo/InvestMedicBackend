import { DataTypes } from "sequelize";
import db from "../config";
import Patient from "./Patient";
import Service from "./Service";
import MedicalPractitioner from "./MedicalPractitioner";

const Feedback = db.define(
    "Feedback",
    {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false ,
            references: {
                model: Patient,
                key: "id"
            }          
        },
        service_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Service,
                key: "id"
            }
        },
        medical_practitioner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: MedicalPractitioner,
                key: "id"
            }
        }
    },
    {
        timestamps: true
    }
)

export default Feedback;