import { Request, Response } from "express";
import { handleHttp } from "../../core/utils/error.handle";
import { getAllMedicalPractitioners} from "../../core/services/medicalpractitioner.service";

export const getAllMedicalPractitionersController = async (_req: Request, res: Response) => {
    try {
        const medicalPractitioners = await getAllMedicalPractitioners();
        if (medicalPractitioners) {
            res.status(200).send(medicalPractitioners);
        } else {
            res.status(400).send(medicalPractitioners);
        }
    } catch (error) {
        handleHttp(res, 'ERROR_GET_MEDICAL_PRACTITIONERS', error);
    }
}