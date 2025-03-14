"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhookController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const error_handle_1 = require("../utils/error.handle");
const webhook_service_1 = require("./webhook.service");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const stripeWebhookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("entrando webhook");
        const sig = req.headers['stripe-signature'];
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("webhook verificado", event.type);
        const response = yield (0, webhook_service_1.handleStripeEvent)(event);
        if (response) {
            res.status(200).send("Recibido");
        }
        res.status(400).send(response);
    }
    catch (error) {
        console.log(error);
        (0, error_handle_1.handleHttp)(res, 'ERROR_STRIPE_WEBHOOK', error);
    }
});
exports.stripeWebhookController = stripeWebhookController;
