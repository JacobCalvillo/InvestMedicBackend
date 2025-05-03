// src/infrastructure/database/repositories/TypeORMStatusRepository.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db/typeORM.config";
import { StatusEntity } from "../entities/status.entity";
import { Status } from "../../../core/domain/entities/Status";
import { StatusRepository } from "../../../core/domain/interfaces/repositories/StatusRepository";

export class TypeORMStatusRepository implements StatusRepository {
    private repository: Repository<StatusEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(StatusEntity);
    }

    async findAll(): Promise<Status[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Status | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findByName(name: string): Promise<Status | null> {
        return this.repository.findOne({ where: { name } });
    }

    async create(name: string): Promise<Status> {
        const status = this.repository.create({ name });
        return this.repository.save(status);
    }
}