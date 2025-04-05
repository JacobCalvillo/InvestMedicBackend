import { Router } from 'express';
import { stripeWebhookController } from "../../webhook/webhook.controller";

const router = Router();

router.post('/webhook', stripeWebhookController);

export { router };
