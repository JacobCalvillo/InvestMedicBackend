"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/login', authController_1.logincontroller);
router.post('/register', authController_1.registercontroller);
