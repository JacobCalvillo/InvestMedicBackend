"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const medicalpractitioner_controller_1 = require("../controllers/medicalpractitioner.controller");
const router = (0, express_1.Router)();
exports.router = router;
//GET
router.get('/medicalpractitioners', medicalpractitioner_controller_1.getAllMedicalPractitionersController);
