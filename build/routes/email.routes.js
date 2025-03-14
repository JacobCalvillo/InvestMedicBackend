"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const email_controller_1 = require("../controllers/email.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/email/welcome', email_controller_1.sendWelcomeEmailController);
