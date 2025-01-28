import { DataTypes, Model } from "sequelize";
import db  from "../config";
import Patient from "./Patient";
import MedicalPractitioner from "./MedicalPractitioner";
import Service from "./Service";
import Consult from "./Consult";
import Status from "./Status";

class Appointment extends Model {}

Appointment.init(
    {
        schedule: {
            type: DataTypes.DATE,
            allowNull: false
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Status,
                key: "id"
            }
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Patient,
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
        },
        service_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Service,
                key: "id"
            }
        }
    },
    {
        timestamps: true,
        tableName: "Appointment",
        sequelize: db
    }
)


Appointment.belongsTo(MedicalPractitioner, {
    foreignKey: {
        name: "medical_practitioner_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Appointment.belongsTo(Service, {
    foreignKey: {
        name: "service_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Appointment.hasOne(Consult, {
    foreignKey: {
        name: "appointment_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

export default Appointment;