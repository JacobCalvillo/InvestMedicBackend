// src/core/domain/entities/Service.ts
export interface Service {
    id?: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    stripePriceId?: string;
    stripeProductId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}