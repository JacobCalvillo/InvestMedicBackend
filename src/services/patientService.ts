import Patient from "../db/models/Patient";
import User from "../db/models/User";
import { IPatientCreationAttributes } from "../utils/interfaces/IPaciente";

const createPatient = async (data: IPatientCreationAttributes) => {
    try {
        console.log(data);
        
        const newPatient = await Patient.create(data);
        console.log(newPatient);
        return newPatient;
    } catch (error) {
        console.error("Error al crear el paciente:", error);
        return null;
    }
};


const getPatient = async (id: number) => {
    try {
        const patient = await Patient.findOne({
            include: {
                model: User,
            },
            where: { userId: id }
        });
        return patient;
    } catch (error) {
        console.error("Error al obtener el paciente:", error);
        return null;
    }
}

const getPatients = async () => {
    try {
        const patient = await Patient.findAll({
            include: {
                model: User
            }
        });
        return patient;
    } catch (error) {
        console.error("Error al obtener el paciente:", error);
        return null;
    }
}
  

export { createPatient, getPatients, getPatient };