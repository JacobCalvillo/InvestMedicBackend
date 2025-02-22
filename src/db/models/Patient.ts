// db/models/Patient.ts
import { User } from './User';

export interface Patient {
    id: number;
    name: string;
    lastName: string;
    birthDate: Date;
    weight: number;
    height: number;
    gender: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactLastName: string;
    emergencyContactRelationship: string;
    emergencyContactPhone: string;
    maritalStatus: string;
    privacyConsent: boolean;
    userId: number;
    user?: Pick<User, 'username' | 'email' | 'phone' | 'profile_picture_url'>; // <-- Agregar esta propiedad opcional
}
