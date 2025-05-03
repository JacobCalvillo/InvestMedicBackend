// src/infrastructure/database/repositories/TypeORMMedicalPractitionerServiceRepository.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db/typeORM.config";
import { MedicalPractitionerServiceEntity } from "../entities/medical-practitioner-service.entity";
import { MedicalPractitionerService } from "../../../core/domain/entities/MedicalPractitionerService";
import { MedicalPractitionerServiceRepository } from "../../../core/domain/interfaces/repositories/MedicalPractitionerServiceRepository";

export class TypeORMMedicalPractitionerServiceRepository implements MedicalPractitionerServiceRepository {
    private repository: Repository<MedicalPractitionerServiceEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(MedicalPractitionerServiceEntity);
    }

    async findByMedicalPractitionerId(medicalPractitionerId: number): Promise<MedicalPractitionerService[]> {
        return this.repository.find({
            where: { medicalPractitionerId },
            relations: ['service']
        });
    }

    async findByServiceId(serviceId: number): Promise<MedicalPractitionerService[]> {
        return this.repository.find({
            where: { serviceId },
            relations: ['medicalPractitioner']
        });
    }

    async create(medicalPractitionerService: MedicalPractitionerService): Promise<MedicalPractitionerService> {
        const newRelation = this.repository.create(medicalPractitionerService);
        return this.repository.save(newRelation);
    }

    async delete(medicalPractitionerId: number, serviceId: number): Promise<boolean> {
        const result = await this.repository.delete({
            medicalPractitionerId,
            serviceId
        });
        return result.affected ? result.affected > 0 : false;
    }

    async exists(medicalPractitionerId: number, serviceId: number): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                medicalPractitionerId,
                serviceId
            }
        });
        return count > 0;
    }
}