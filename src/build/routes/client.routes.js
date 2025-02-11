"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const customerController_1 = require("../controllers/customerController");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/client', customerController_1.createCustomerConstroller);
router.post('/client/secret', customerController_1.getClientSecretConstroller);
