// src/infrastructure/database/repositories/TypeORMServiceRepository.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/db/typeORM.config";
import { ServiceEntity } from "../entities/service.entity";
import { Service } from "../../../core/domain/entities/Service";
import { ServiceRepository } from "../../../core/domain/interfaces/repositories/ServiceRepository";

export class TypeORMServiceRepository implements ServiceRepository {
    private repository: Repository<ServiceEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(ServiceEntity);
    }

    async findAll(): Promise<Service[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Service | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findByName(name: string): Promise<Service | null> {
        return this.repository.findOne({ where: { name } });
    }

    async create(service: Omit<Service, "id">): Promise<Service> {
        const newService = this.repository.create(service);
        return this.repository.save(newService);
    }

    async update(service: Service): Promise<Service | null> {
        if (!service.id) {
            throw new Error('Service ID is required for update');
        }

        const existingService = await this.repository.findOne({ 
            where: { id: service.id } 
        });
        
        if (!existingService) {
            return null;
        }

        // Update fields
        Object.assign(existingService, service);

        // Save changes
        return this.repository.save(existingService);
    }

    async updateStripeInfo(id: number, stripePriceId: string, stripeProductId: string): Promise<Service | null> {
        const service = await this.repository.findOne({ where: { id } });
        if (!service) return null;

        service.stripePriceId = stripePriceId;
        service.stripeProductId = stripeProductId;
        
        return this.repository.save(service);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}