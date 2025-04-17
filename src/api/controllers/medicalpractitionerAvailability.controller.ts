import { Request, Response } from "express";
import { getMedicalPractitionerAvailability, getMedicalPractitionerAvailabilityByMedicalId } from "../../core/services/medicalpractitionerAvailability.service";
import {handleHttp} from "../../core/utils/error.handle";

export const getMedicalPractitionerAvailabilityController = async (_req: Request, res: Response) => {
    try {
        const medicalPractitionerAvailability = await getMedicalPractitionerAvailability();
        if(medicalPractitionerAvailability) {
            res.status(200).send(medicalPractitionerAvailability);
        } else {
            res.status(400).send(medicalPractitionerAvailability);
        }
    }
    catch (error) {
        console.error(error);
        handleHttp(res, 'ERROR_GET_MEDICAL_PRACTITIONER_AVAILABILITY', error)
    }
}


export const getMedicalPractitionerAvailabilityById = async (req: Request, res: Response) => {
   try{
       const id = req.params.id;

       const medicalPractitionerAvailability = await getMedicalPractitionerAvailabilityByMedicalId(Number(id));
       if(medicalPractitionerAvailability) {
           res.status(200).send(medicalPractitionerAvailability);
       } else {
           res.status(400).send(medicalPractitionerAvailability);
       }
   } catch (error) {
       console.log(error);
       handleHttp(res, 'ERROR_GET_MEDICAL_PRACTITIONER_AVAILABILITY_BY_ID', error)
   }

}