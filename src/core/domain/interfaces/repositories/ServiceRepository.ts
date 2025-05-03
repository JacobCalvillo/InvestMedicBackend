// src/core/domain/interfaces/repositories/ServiceRepository.ts
import { Service } from '../../entities/Service';

export interface ServiceRepository {
    findAll(): Promise<Service[]>;
    findById(id: number): Promise<Service | null>;
    findByName(name: string): Promise<Service | null>;
    create(service: Omit<Service, "id">): Promise<Service>;
    update(service: Service): Promise<Service | null>;
    updateStripeInfo(id: number, stripePriceId: string, stripeProductId: string): Promise<Service | null>;
    delete(id: number): Promise<boolean>;
}