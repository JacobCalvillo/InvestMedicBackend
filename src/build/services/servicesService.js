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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createService = exports.getServiceByName = exports.getServiceById = exports.getServices = void 0;
const Service_1 = __importDefault(require("../db/models/Service"));
const getServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield Service_1.default.findAll();
        return services;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getServices = getServices;
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield Service_1.default.findOne({ where: { id: id } });
        return service;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getServiceById = getServiceById;
const getServiceByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield Service_1.default.findOne({ where: { name: name } });
        return service;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getServiceByName = getServiceByName;
const createService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newService = yield Service_1.default.create({
            data: data
        });
        return newService;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.createService = createService;
