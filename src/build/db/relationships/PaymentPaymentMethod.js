"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Payment_1 = __importDefault(require("../models/Payment"));
const PaymentMethod_1 = __importDefault(require("../models/PaymentMethod"));
PaymentMethod_1.default.hasOne(Payment_1.default, {
    foreignKey: {
        name: "payment_method_id"
    }
});
