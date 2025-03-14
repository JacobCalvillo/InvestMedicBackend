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
exports.createPayment = exports.createPaymentIntent = exports.createCustomer = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const createCustomer = (customerParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerCreated = yield stripe.customers.create(customerParams);
        return customerCreated;
    }
    catch (error) {
        console.error(error);
        return error;
    }
});
exports.createCustomer = createCustomer;
const createPaymentIntent = (paymentIntentParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentIntent = yield stripe.paymentIntents.create(paymentIntentParams);
        return paymentIntent;
    }
    catch (error) {
        console.error(error);
        return error;
    }
});
exports.createPaymentIntent = createPaymentIntent;
const createPayment = (paymentParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentIntent = yield stripe.paymentIntents.create(paymentParams);
        return paymentIntent;
    }
    catch (error) {
        console.error(error);
        return [];
    }
});
exports.createPayment = createPayment;
