export interface MedicalPractitionerAvailability {
    id?: number;
    dayOfWeek: string;
    startTime:Date;
    endTime:Date;
    medicalPractitionerId: number;
}