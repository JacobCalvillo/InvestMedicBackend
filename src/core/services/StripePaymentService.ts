// src/core/services/payment/StripePaymentService.ts
import { getStripe } from '../../infrastructure/payment/StripeService';
import { StripeSession } from '../../../features/payments/types/StripeSession';
import Stripe from 'stripe';

export interface StripeSessionResult {
  success: boolean;
  url?: string;
  error?: {
    message: string;
    code?: string;
  };
}

export class StripePaymentService {
  private stripe = getStripe();

  /**
   * Creates a checkout session for a service purchase
   */
  async createCheckoutSession(
    serviceId: number,
    customerEmail: string,
    quantity: number,
    appointmentId: number,
    successUrl: string
  ): Promise<StripeSessionResult> {
    try {
      // Get service price from database
      const service = await this.getServiceById(serviceId);
      if (!service || !service.stripe_price_id) {
        return {
          success: false,
          error: {
            message: 'Service or price ID not found',
            code: 'SERVICE_NOT_FOUND'
          }
        };
      }

      // Create session with proper error handling
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card', 'oxxo'],
        line_items: [
          {
            price: service.stripe_price_id,
            quantity: quantity || 1,
          },
        ],
        mode: 'payment',
        customer_email: customerEmail,
        success_url: successUrl,
        metadata: {
          appointment_id: appointmentId.toString(),
        },
        // Add expiration for abandoned checkouts
        expires_at: Math.floor(Date.now() / 1000) + 60 * 30, // 30 minutes
      });

      return {
        success: true,
        url: session.url || undefined
      };
    } catch (error) {
      console.error('Stripe session creation error:', error);
      return this.handleStripeError(error);
    }
  }

  /**
   * Creates a Stripe product and price from a service
   */
  async createProductAndPrice(service: any): Promise<any> {
    try {
      // Transaction using try/catch and atomic operations
      const stripeProduct = await this.stripe.products.create({
        name: service.name,
        description: service.description || '',
        metadata: {
          service_id: service.id.toString(),
        }
      });

      const price = await this.stripe.prices.create({
        unit_amount: Math.round(service.price * 100), // Ensure integer
        currency: 'mxn',
        product: stripeProduct.id
      });

      return { productId: stripeProduct.id, priceId: price.id };
    } catch (error) {
      console.error('Error creating Stripe product:', error);
      throw error; // Re-throw for transaction handling
    }
  }

  /**
   * Handle Stripe webhook events
   */
  async handleWebhookEvent(event: Stripe.Event): Promise<boolean> {
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;
          const appointmentId = session.metadata?.appointment_id;
          
          if (appointmentId) {
            await this.updateAppointmentStatus(Number(appointmentId), 2); // Paid status
            return true;
          }
          return false;
          
        // Handle other events like payment_intent.succeeded, etc.
        default:
          console.log(`Unhandled event type: ${event.type}`);
          return false;
      }
    } catch (error) {
      console.error(`Error handling ${event.type}:`, error);
      return false;
    }
  }

  // Helper methods
  private async getServiceById(id: number): Promise<any> {
    // Implementation to fetch service with its Stripe price ID
    // Replace with your actual database query
  }

  private async updateAppointmentStatus(appointmentId: number, statusId: number): Promise<boolean> {
    // Implementation to update appointment status
    // Replace with your actual database update
  }

  private handleStripeError(error: any): StripeSessionResult {
    if (error instanceof Stripe.errors.StripeError) {
      return {
        success: false,
        error: {
          message: error.message,
          code: error.type
        }
      };
    }
    
    return {
      success: false,
      error: {
        message: 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR'
      }
    };
  }
}