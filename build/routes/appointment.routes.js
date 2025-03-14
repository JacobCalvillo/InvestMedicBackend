"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const appointment_controller_1 = require("../controllers/appointment.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
//GET
router.get("/appointments", appointment_controller_1.getAppointmentsController);
//POST
router.post("/appointment", appointment_controller_1.createAppointmentController);
//PUT
router.put("/appointment", appointment_controller_1.updateAppointmentController);
router.put("/appointment/:id/:statusId", appointment_controller_1.updateStatusAppointmentController);
