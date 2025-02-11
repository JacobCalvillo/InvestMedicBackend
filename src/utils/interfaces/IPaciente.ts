
import { Optional } from "sequelize";

export interface IPatientAttributes {
  id?: number;
  name: string;
  lastName: string;
  birthDate: Date;
  weight?: number;
  height?: number;
  gender?: string;
  maritalStatusId?: number;
  address?: string;
  occupation?: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  emergencyContactName?: string;
  emergencyContactLastName?: string;
  emergencyContactRelationship?: string;
  emergencyContactPhone?: string;
  insuranceId?: number;
  gynecobstetricsId?: number;
  privacyConsent?: boolean;
  consentId?: number;
  userId: number;
  identificationId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPatientCreationAttributes
  extends Optional<IPatientAttributes, "id" | "createdAt" | "updatedAt"> {}
