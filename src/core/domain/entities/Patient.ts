export interface Patient {
    id? :number
    name: string;
    lastName: string;
    birthDate: Date;
    weight?: number;
    height?: number;
    gender?: string;
    street?: string;
    postalCode?: string;
    occupation?: string;
    emergencyContactName?: string;
    emergencyContactLastName?: string;
    emergencyContactRelationship?: string;
    emergencyContactPhone?: string;
    maritalStatus?: string;
    privacyConsent: boolean
    userId: number;
} 