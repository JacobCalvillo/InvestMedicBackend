import { Pool } from 'pg';
import {IdentificationType} from '../../../core/domain/entities/IdentificationType';
import {
    IdentificationTypesRepository
} from "../../../core/domain/interfaces/repositories/IdentificationTypesRepository";

export class PostgresIdentificationTypesRepository implements IdentificationTypesRepository {
    constructor(private db: Pool) {
    }

    async findAll(): Promise<IdentificationType[] | null> {
        const result = await this.db.query('SELECT * FROM Identification_type');
        return result.rows;
    }
}