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
exports.updateStatusAppointmentController = exports.updateAppointmentController = exports.createAppointmentController = exports.getAppointmentsController = void 0;
const appointment_service_1 = require("../services/appointment.service");
const error_handle_1 = require("../utils/error.handle");
const getAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointment_service_1.getAppointments)();
        if (appointments) {
            res.status(200).send(appointments);
        }
        else {
            res.status(404).send(appointments);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERR_GET_APPOINTMENTS", error);
    }
});
exports.getAppointmentsController = getAppointmentsController;
const createAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = yield (0, appointment_service_1.createAppointment)(req.body);
        if (newAppointment) {
            console.log(newAppointment);
            res.status(201).send(newAppointment);
        }
        else {
            res.status(404).send(newAppointment);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERR_CREATE_APPOINTMENT", error);
    }
});
exports.createAppointmentController = createAppointmentController;
const updateAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAppointment = yield (0, appointment_service_1.updateAppointment)(req.body);
        if (updatedAppointment) {
            res.status(200).send(updatedAppointment);
        }
        else {
            res.status(404).send(appointment_service_1.createAppointment);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERR_UPDATE_APPOINTMENT", error);
    }
});
exports.updateAppointmentController = updateAppointmentController;
const updateStatusAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, statusId } = req.params;
        const updateStatus = yield (0, appointment_service_1.updateStatusAppointment)(Number(id), Number(statusId));
        if (updateStatus) {
            res.status(200).send(updateStatus);
        }
        else {
            res.status(404).send(appointment_service_1.createAppointment);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERR_UPDATE_APPOINTMENT", error);
    }
});
exports.updateStatusAppointmentController = updateStatusAppointmentController;
