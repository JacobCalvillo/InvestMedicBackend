"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/payments', paymentController_1.getPaymentsController);
router.post('/payment', paymentController_1.createPaymentController);
