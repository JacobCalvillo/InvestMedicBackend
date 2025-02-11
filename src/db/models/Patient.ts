import { DataTypes, Model } from "sequelize";
import db from "../config";
import MaritalStatus from "./MaritalStatus";
import Insurance from "./Insurance";
import Identification from "./IdentificationUser";
import Gynecobstetrics from "./Gynecobstetrics";
import Consent from "./Consent";
import Appointment from "./Appointment";
import Invoice from "./Invoice";
import User from "./User";
import { IPatientAttributes, IPatientCreationAttributes } from "../../utils/interfaces/IPaciente";

class Patient extends Model<IPatientAttributes, IPatientCreationAttributes> implements IPatientAttributes {
    public id!: number;
    public name!: string;
    public lastName!: string;
    public birthDate!: Date;
    public weight?: number;
    public height?: number;
    public gender?: string;
    public maritalStatusId?: number;
    public address?: string;
    public occupation?: string;
    public allergies?: string;
    public currentMedication?: string;
    public familyMedicalHistory?: string;
    public pastMedicalHistory?: string;
    public emergencyContactName?: string;
    public emergencyContactLastName?: string;
    public emergencyContactRelationship?: string;
    public emergencyContactPhone?: string;
    public insuranceId?: number;
    public gynecobstetricsId?: number;
    public privacyConsent?: boolean;
    public consentId?: number;
    public userId!: number;
    public identificationId?: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Patient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        set(value: string) {
          this.setDataValue('name', value.trim().replace(/\b\w/g, (char) => char.toUpperCase()));
        }
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        set(value: string) {
          this.setDataValue('lastName', value.trim().replace(/\b\w/g, (char) => char.toUpperCase()));
        }
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      maritalStatusId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: true,
        set(value: string) {
          this.setDataValue(
            'address',
            value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
          );
        }
      },
      occupation: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      emergencyContactName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      emergencyContactLastName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      emergencyContactRelationship: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      emergencyContactPhone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      insuranceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      allergies: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      currentMedication: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      familyMedicalHistory: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      pastMedicalHistory: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      identificationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      gynecobstetricsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      privacyConsent: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      consentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id"
        }
      }
    },
    {
      sequelize: db,
      timestamps: true,
      tableName: "Patient",
      modelName: "Patient",
      underscored: true
    }
  );
  


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
