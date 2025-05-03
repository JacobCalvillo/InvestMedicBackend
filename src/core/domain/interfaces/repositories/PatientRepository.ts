import { Patient } from "../../entities/Patient";

export interface PatientRepository {
    findAll(): Promise<Patient[] | null>;
    findById(id: number): Promise<Patient | null>;
    save(patient: Patient): Promise<Patient>;
    delete(id: number): Promise<boolean>
}