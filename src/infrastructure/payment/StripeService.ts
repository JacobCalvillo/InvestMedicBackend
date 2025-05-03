import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config();

export class StripeService {
    private static instance: StripeService;
    private stripe : Stripe;

    private constructor() {
        const apikey = process.env.STRIPE_SECRET_KEY;
        if (!apikey) {
            throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
        }

        this.stripe = new Stripe(apikey, {
            typescript: true,
        })
    }

    public static getInstance(): StripeService {
        if(!StripeService.instance) {
            StripeService.instance = new StripeService();
        }
        return StripeService.instance;
    }
    
    public getStripe(): Stripe {
        return this.stripe;
    }
}

export const getStripe = (): Stripe => {
    return StripeService.getInstance().getStripe();
};