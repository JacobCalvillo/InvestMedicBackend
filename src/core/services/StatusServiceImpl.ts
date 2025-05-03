// src/core/services/StatusServiceImpl.ts
import { Status } from "../domain/entities/Status";
import { StatusRepository } from "../domain/interfaces/repositories/StatusRepository";
import { StatusService } from "../domain/interfaces/services/StatusService";
import { AppError } from "../domain/errors/AppError";

export class StatusServiceImpl implements StatusService {
    constructor(private statusRepository: StatusRepository) {}

    async getAllStatuses(): Promise<Status[]> {
        return this.statusRepository.findAll();
    }

    async getStatusById(id: number): Promise<Status | null> {
        const status = await this.statusRepository.findById(id);
        if (!status) {
            throw new AppError('Status not found', 404);
        }
        return status;
    }

    async getStatusByName(name: string): Promise<Status | null> {
        return this.statusRepository.findByName(name);
    }

    async createStatus(name: string): Promise<Status> {
        // Check if status with the same name already exists
        const existingStatus = await this.statusRepository.findByName(name);
        if (existingStatus) {
            throw new AppError('Status with this name already exists', 409);
        }

        return this.statusRepository.create(name);
    }
}