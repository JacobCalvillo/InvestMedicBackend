import {IdentificationType} from "../../infrastructure/database/models/IdentificationType";
import {IdentificationTypesRepository} from "../domain/interfaces/repositories/IdentificationTypesRepository";
import {IdentificationTypesService} from "../domain/interfaces/services/IdentificationTypesService";

export class IdentificationTypesImpl implements IdentificationTypesService {
    constructor(
        private identificationTypesRepository: IdentificationTypesRepository
    ) {
    }

    getIdentificationTypes(): Promise<IdentificationType[] | null> {
        return this.identificationTypesRepository.findAll();
    }

}

