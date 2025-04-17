import {IdentificationType} from "../../../../infrastructure/database/models/IdentificationType";

export interface IdentificationTypesRepository {
    findAll(): Promise<IdentificationType[] | null>;
}