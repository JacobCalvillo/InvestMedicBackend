import { IdentificationType } from "../../entities/IdentificationType";

export interface IdentificationTypesService {
    getIdentificationTypes(): Promise<IdentificationType[] | null>;
}