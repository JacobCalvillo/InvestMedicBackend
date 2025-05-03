// src/core/domain/interfaces/services/ServiceService.ts
import { Service } from '../../entities/Service';

export interface ServiceService {
    getAllServices(): Promise<Service[]>;
    getServiceById(id: number): Promise<Service | null>;
    getServiceByName(name: string): Promise<Service | null>;
    createService(service: Omit<Service, "id">): Promise<Service | null>;
    updateService(service: Service): Promise<Service | null>;
    deleteService(id: number): Promise<boolean>;
    createCheckoutSession(
        serviceId: number,
        customerEmail: string,
        quantity: number,
        appointmentId: number
    ): Promise<string | null>;
}