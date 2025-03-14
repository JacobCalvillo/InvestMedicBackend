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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentController = exports.getClientSecretController = exports.createCustomerController = void 0;
const customer_service_1 = require("../services/customer.service");
const createCustomerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body.params;
        const customer = yield (0, customer_service_1.createCustomer)(params);
        res.status(201).send(customer);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.createCustomerController = createCustomerController;
const getClientSecretController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body;
        const intent = yield (0, customer_service_1.createPaymentIntent)(params);
        res.status(200).send({ client_secret: intent.client_secret });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.getClientSecretController = getClientSecretController;
const createPaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body;
        const payment = yield (0, customer_service_1.createPayment)(params);
        if (payment) {
            res.status(201).send(payment);
        }
        else {
            res.status(400).send(payment);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.createPaymentController = createPaymentController;
