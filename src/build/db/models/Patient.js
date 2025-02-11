"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const MaritalStatus_1 = __importDefault(require("./MaritalStatus"));
const Insurance_1 = __importDefault(require("./Insurance"));
const IdentificationUser_1 = __importDefault(require("./IdentificationUser"));
const Gynecobstetrics_1 = __importDefault(require("./Gynecobstetrics"));
const Consent_1 = __importDefault(require("./Consent"));
const Appointment_1 = __importDefault(require("./Appointment"));
const Invoice_1 = __importDefault(require("./Invoice"));
const User_1 = __importDefault(require("./User"));
class Patient extends sequelize_1.Model {
}
Patient.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        set(value) {
            this.setDataValue('name', value.trim().replace(/\b\w/g, (char) => char.toUpperCase()));
        }
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        set(value) {
            this.setDataValue('lastName', value.trim().replace(/\b\w/g, (char) => char.toUpperCase()));
        }
    },
    birthDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    weight: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    height: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true,
    },
    maritalStatusId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        set(value) {
            this.setDataValue('address', value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()));
        }
    },
    occupation: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    emergencyContactName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    emergencyContactLastName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    emergencyContactRelationship: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    emergencyContactPhone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    insuranceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    allergies: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    currentMedication: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    familyMedicalHistory: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    pastMedicalHistory: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    identificationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    gynecobstetricsId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    privacyConsent: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    consentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default,
            key: "id"
        }
    }
}, {
    sequelize: config_1.default,
    timestamps: true,
    tableName: "Patient",
    modelName: "Patient",
    underscored: true
});
Patient.belongsTo(MaritalStatus_1.default, {
    foreignKey: {
        name: "marital_status_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
});
Patient.belongsTo(Insurance_1.default, {
    foreignKey: {
        name: "insurance_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
});
Patient.belongsTo(IdentificationUser_1.default, {
    foreignKey: {
        name: "identification_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
});
Patient.belongsTo(Gynecobstetrics_1.default, {
    foreignKey: {
        name: "gynecobstetrics_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
});
Patient.belongsToMany(Consent_1.default, {
    through: "Patient_Consent",
});
Patient.hasMany(Appointment_1.default, {
    foreignKey: {
        name: "patient_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
});
Patient.hasOne(Invoice_1.default, {
    foreignKey: {
        name: "patient_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
});
exports.default = Patient;
