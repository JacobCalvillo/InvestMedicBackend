"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const service_controller_1 = require("../controllers/service.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
//GET
router.get('/services', service_controller_1.getServicesController);
router.get('/service/:id', service_controller_1.getServiceByIdController);
//POST
router.post('/services', service_controller_1.createServiceController);
router.post('/services/stripe', service_controller_1.stripeSessionController);
