"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const customer_controller_1 = require("../controllers/customer.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
//POST
router.post('/client', customer_controller_1.createCustomerController);
router.post('/client/secret', customer_controller_1.getClientSecretController);
router.post('/client/payment', customer_controller_1.createPaymentController);
