import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCustomer = async(customerParams: Stripe.CustomerCreateParams) => {
    try {
        const customerCreated: Stripe.Customer = await stripe.customers.create(customerParams);

        return customerCreated; 

    } catch (error: unknown) {
        console.error(error);
        return error;
    }
}


export const createpaymentIntent = async (paymentIntentParams: Stripe.PaymentIntentCreateParams) => {
    try {
        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

        return paymentIntent;
    } catch (error: unknown) {
        console.error(error);
        return error;
    }
}

export const createPayment =  async(paymentParams: Stripe.PaymentIntentCreateParams) => {
    try {
        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(paymentParams);

        return paymentIntent;
    } catch (error: unknown) {
        console.error(error);
        return error;
    }
}
