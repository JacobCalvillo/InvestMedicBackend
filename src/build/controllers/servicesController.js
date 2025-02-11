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
exports.getServiceByIdController = exports.getServiceByNameController = exports.getServicesController = exports.createServiceController = void 0;
const servicesService_1 = require("../services/servicesService");
const createServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body;
        const service = yield (0, servicesService_1.createService)(params);
        res.status(201).send(service);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.createServiceController = createServiceController;
const getServicesController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield (0, servicesService_1.getServices)();
        res.status(200).send(services);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.getServicesController = getServicesController;
const getServiceByNameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const decodedName = decodeURIComponent(name);
        const service = yield (0, servicesService_1.getServiceByName)(decodedName);
        console.log(service);
        res.status(200).send(service);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.getServiceByNameController = getServiceByNameController;
const getServiceByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(`aqui estoy ${id}`);
        const service = yield (0, servicesService_1.getServiceById)(Number(id));
        console.log(service);
        res.status(200).send(service);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.getServiceByIdController = getServiceByIdController;
