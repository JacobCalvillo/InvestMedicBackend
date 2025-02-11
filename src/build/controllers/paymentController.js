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
exports.createPaymentController = exports.getPaymentsController = void 0;
const paymentService_1 = require("../services/paymentService");
const getPaymentsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield (0, paymentService_1.getPayments)();
        res.status(200).send(payments);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.getPaymentsController = getPaymentsController;
//testear esto para que pueda almacenar datos
const createPaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, amount, currency, status, payment_method } = req.body;
        const payment = yield (0, paymentService_1.createPayment)({ id, amount, currency, status, payment_method });
        res.status(200).send(payment);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.createPaymentController = createPaymentController;
