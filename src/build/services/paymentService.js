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
exports.createPayment = exports.getPayments = void 0;
const Payment_1 = __importDefault(require("../db/models/Payment"));
const getPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield Payment_1.default.findAll();
        return payments;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getPayments = getPayments;
//TODO: crear el payment tanto en base de datos, como en stripe
const createPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data);
        const newPayment = yield Payment_1.default.create({
            data: data
        });
        return newPayment;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.createPayment = createPayment;
