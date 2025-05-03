// src/core/domain/interfaces/services/StatusService.ts
import { Status } from "../../../domain/entities/Status";

export interface StatusService {
    getAllStatuses(): Promise<Status[]>;
    getStatusById(id: number): Promise<Status | null>;
    getStatusByName(name: string): Promise<Status | null>;
    createStatus(name: string): Promise<Status>;
}