import Stripe from "stripe";
import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { handleStripeEvent} from "./webhook.service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const stripeWebhookController = async (req: Request, res: Response) => {
    try {
        console.log("entrando webhook");
        const sig = req.headers['stripe-signature'] as string;
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
        console.log("webhook verificado", event.type);

        const response = await handleStripeEvent(event);
        if (response) {
            res.status(200).send("Recibido");
        }
        res.status(400).send(response);
    } catch (error) {
        console.log(error);
        handleHttp(res, 'ERROR_STRIPE_WEBHOOK', error);
    }
}