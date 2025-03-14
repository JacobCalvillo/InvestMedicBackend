"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const medicalpractitionerAvailability_controller_1 = require("../controllers/medicalpractitionerAvailability.controller");
const router = (0, express_1.Router)();
exports.router = router;
//GET
router.get('/medicalpractitionerAvailability', medicalpractitionerAvailability_controller_1.getMedicalPractitionerAvailabilityController);
router.get('/medicalpractitioner/:id/availability', medicalpractitionerAvailability_controller_1.getMedicalPractitionerAvailabilityById);
