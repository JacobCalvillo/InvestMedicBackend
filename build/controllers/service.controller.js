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
exports.createServiceController = exports.getServiceByIdController = exports.getServicesController = exports.stripeSessionController = void 0;
const service_service_1 = require("../services/service.service");
const error_handle_1 = require("../utils/error.handle");
const stripeSessionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = req.body;
        const sessionStripe = yield (0, service_service_1.stripeSession)(Number(session.serviceId), session.customerEmail, Number(session.quantity), Number(session.appointmentId));
        if (session) {
            res.status(200).send(sessionStripe);
        }
        else {
            res.status(404).send(sessionStripe);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERR_STRIPE_SESSION", error);
    }
});
exports.stripeSessionController = stripeSessionController;
const getServicesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield (0, service_service_1.getServices)();
        if (services) {
            res.status(200).send(services);
        }
        else {
            res.status(404).send(services);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERR_GET_SERVICES", error);
    }
});
exports.getServicesController = getServicesController;
const getServiceByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const service = yield (0, service_service_1.getServiceById)(Number(id));
        if (service) {
            res.status(200).send(service);
        }
        else {
            res.status(404).send(service);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERR_GET_SERVICE", error);
    }
});
exports.getServiceByIdController = getServiceByIdController;
const createServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = req.body;
        const newService = yield (0, service_service_1.createService)(service);
        if (newService) {
            res.status(201).send(newService);
        }
        else {
            res.status(400).send(newService);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERR_CREATE_SERVICE", error);
    }
});
exports.createServiceController = createServiceController;
