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
exports.getClientSecretConstroller = exports.createCustomerConstroller = void 0;
const customerService_1 = require("../services/customerService");
const createCustomerConstroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body.params;
        const customer = yield (0, customerService_1.createCustomer)(params);
        res.status(201).send(customer);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.createCustomerConstroller = createCustomerConstroller;
const getClientSecretConstroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body;
        const intent = yield (0, customerService_1.createpaymentIntent)(params);
        res.status(200).send({ client_secret: intent.client_secret });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.getClientSecretConstroller = getClientSecretConstroller;
