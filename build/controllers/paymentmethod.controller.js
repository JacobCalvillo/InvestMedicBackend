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
exports.getPaymentMethodsController = void 0;
const error_handle_1 = require("../utils/error.handle");
const paymentmethod_service_1 = require("../services/paymentmethod.service");
const getPaymentMethodsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentMethods = yield (0, paymentmethod_service_1.getPaymentMethods)();
        if (paymentMethods) {
            res.status(200).send(paymentMethods);
        }
        else {
            res.status(400).send(paymentMethods);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERR_GET_PAYMENT_METHODS", error);
    }
});
exports.getPaymentMethodsController = getPaymentMethodsController;
