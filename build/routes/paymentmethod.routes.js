"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const paymentmethod_controller_1 = require("../controllers/paymentmethod.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
// GET
router.get("/payment/methods", paymentmethod_controller_1.getPaymentMethodsController);
