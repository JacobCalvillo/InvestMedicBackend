"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentsByPatientIdController = exports.getAppointmentsController = exports.createAppointmentController = void 0;
const appointmentService_1 = require("../services/appointmentService");
const createAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const appointment = yield (0, appointmentService_1.createAppointment)(body);
        res.status(200).send(appointment);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createAppointmentController = createAppointmentController;
const getAppointmentsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentService_1.getAppointments)();
        res.status(200).send(appointments);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getAppointmentsController = getAppointmentsController;
const getAppointmentsByPatientIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = Number(req.params.id);
        const appointments = yield (0, appointmentService_1.getAppointmentsByPatientId)(patientId);
        res.status(200).send(appointments);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getAppointmentsByPatientIdController = getAppointmentsByPatientIdController;
