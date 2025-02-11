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
exports.getPatient = exports.getPatients = exports.createPatient = void 0;
const Patient_1 = __importDefault(require("../db/models/Patient"));
const User_1 = __importDefault(require("../db/models/User"));
const createPatient = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data);
        const newPatient = yield Patient_1.default.create(data);
        console.log(newPatient);
        return newPatient;
    }
    catch (error) {
        console.error("Error al crear el paciente:", error);
        return null;
    }
});
exports.createPatient = createPatient;
const getPatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield Patient_1.default.findOne({
            include: {
                model: User_1.default,
            },
            where: { userId: id }
        });
        return patient;
    }
    catch (error) {
        console.error("Error al obtener el paciente:", error);
        return null;
    }
});
exports.getPatient = getPatient;
const getPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield Patient_1.default.findAll({
            include: {
                model: User_1.default
            }
        });
        return patient;
    }
    catch (error) {
        console.error("Error al obtener el paciente:", error);
        return null;
    }
});
exports.getPatients = getPatients;
