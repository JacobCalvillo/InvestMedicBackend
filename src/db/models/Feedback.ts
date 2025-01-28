import { DataTypes } from "sequelize";
import db from "../config";

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
            allowNull: false           
        },
        service_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        medical_practitioner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
)

export default Feedback;