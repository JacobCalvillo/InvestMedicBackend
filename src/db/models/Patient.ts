import { DataTypes, Model } from "sequelize";
import db from "../config";
import MaritalStatus from "./MaritalStatus";
import Insurance from "./Insurance";
import Identification from "./Identification";
import Gynecobstetrics from "./Gynecobstetrics";
import Consent from "./Consent";
import Appointment from "./Appointment";
import Invoice from "./Invoice";

class Patient extends Model {}

Patient.init(
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        weight: {
            type:DataTypes.DECIMAL(10,2),
            allowNull: true,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        marital_status_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        occupation: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        emergency_contact_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        emergency_contact_last_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        emergency_contact_relationship: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        emergency_contact_phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        insurance_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        insurance_policy_number: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        allergies: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        current_medication: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        family_medical_history: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        past_medical_history: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        past_history : {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        identificationType_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        identification_number: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        identificaction_document_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        gynecobstetrics_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        privacy_consent: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        consent_id: {
            type: DataTypes.INTEGER,            
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        } 
    },
    {
        sequelize: db,
        timestamps: true,
        tableName: "Patient"
    }
)


Patient.belongsTo(MaritalStatus, { 
    foreignKey: {
        name: "marital_status_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
})

Patient.belongsTo(Insurance, {
    foreignKey: {
        name: "insurance_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
})

Patient.belongsTo(Identification, {
    foreignKey: {
        name: "identification_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
})

Patient.belongsTo(Gynecobstetrics, {
    foreignKey: {
        name: "gynecobstetrics_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
})

Patient.belongsToMany(Consent, {
    through: "Patient_Consent",
})

Patient.hasMany(Appointment, {
    foreignKey: {
        name: "patient_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
})

Patient.hasOne(Invoice, {
    foreignKey: {
        name: "patient_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
})

export default Patient;
