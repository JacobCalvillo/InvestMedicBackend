import {IdentificationTypesService} from "../../core/domain/interfaces/services/IdentificationTypesService";
import {Request, Response} from "express";

export class IdentificationTypesController {
    constructor(private identificationTypesService: IdentificationTypesService) {}

    getIdentificationTypes = async (_req: Request, res: Response): Promise<void> => {
        const identificationTypes = await this.identificationTypesService.getIdentificationTypes();
        res.status(200).json(identificationTypes);
    };
}