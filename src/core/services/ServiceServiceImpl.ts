// src/core/services/ServiceServiceImpl.ts
import { Service } from "../domain/entities/Service";
import { ServiceRepository } from "../domain/interfaces/repositories/ServiceRepository";
import { ServiceService } from "../domain/interfaces/services/ServiceService";
import { StripeService } from "../../infrastructure/payment/StripeService";
import { AppError } from "../domain/errors/AppError";

export class ServiceServiceImpl implements ServiceService {
    constructor(
        private serviceRepository: ServiceRepository,
        private stripeService: StripeService
    ) {}

    async getAllServices(): Promise<Service[]> {
        return this.serviceRepository.findAll();
    }

    async getServiceById(id: number): Promise<Service | null> {
        const service = await this.serviceRepository.findById(id);
        if (!service) {
            throw new AppError('Service not found', 404);
        }
        return service;
    }

    async getServiceByName(name: string): Promise<Service | null> {
        return this.serviceRepository.findByName(name);
    }

    async createService(service: Omit<Service, "id">): Promise<Service | null> {
        // Check if service with the same name already exists
        const existingService = await this.serviceRepository.findByName(service.name);
        if (existingService) {
            throw new AppError('Service with this name already exists', 409);
        }

        // First create the service in our database
        const newService = await this.serviceRepository.create(service);
        
        // Then create it in Stripe
        try {
            const stripeInfo = await this.stripeService.createProduct(newService);
            
            if (!stripeInfo) {
                // If Stripe creation fails, we should still have the service in our DB
                return newService;
            }
            
            // Update the service with Stripe info
            return this.serviceRepository.updateStripeInfo(
                newService.id!, 
                stripeInfo.stripePriceId, 
                stripeInfo.stripeProductId
            );
        } catch (error) {
            console.error("Error creating service in Stripe:", error);
            // Return the service without Stripe info
            return newService;
        }
    }

    async updateService(service: Service): Promise<Service | null> {
        // Check if service exists
        const existingService = await this.serviceRepository.findById(service.id!);
        if (!existingService) {
            throw new AppError('Service not found', 404);
        }

        // Check if another service with the same name already exists
        const serviceWithSameName = await this.serviceRepository.findByName(service.name);
        if (serviceWithSameName && serviceWithSameName.id !== service.id) {
            throw new AppError('Another service with this name already exists', 409);
        }

        return this.serviceRepository.update(service);
    }

    async deleteService(id: number): Promise<boolean> {
        // Check if service exists
        const service = await this.serviceRepository.findById(id);
        if (!service) {
            throw new AppError('Service not found', 404);
        }

        // Note: We should also delete the service in Stripe
        // But for now, we'll just delete it in our database
        return this.serviceRepository.delete(id);
    }

    async createCheckoutSession(
        serviceId: number, 
        customerEmail: string, 
        quantity: number, 
        appointmentId: number
    ): Promise<string | null> {
        // Check if service exists
        const service = await this.serviceRepository.findById(serviceId);
        if (!service) {
            throw new AppError("Service not found", 404);
        }

        // Create checkout session
        return this.stripeService.createCheckoutSession(
            serviceId,
            customerEmail,
            quantity,
            appointmentId
        );
    }
}