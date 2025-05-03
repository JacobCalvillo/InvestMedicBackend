// src/core/domain/interfaces/repositories/StatusRepository.ts
import { Status } from "../../../domain/entities/Status";

export interface StatusRepository {
    findAll(): Promise<Status[]>;
    findById(id: number): Promise<Status | null>;
    findByName(name: string): Promise<Status | null>;
    create(name: string): Promise<Status>;
}