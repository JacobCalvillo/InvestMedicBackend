"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
exports.router = (0, express_1.Router)();
//GET
exports.router.get("/payments", payment_controller_1.getPaymentsController);
