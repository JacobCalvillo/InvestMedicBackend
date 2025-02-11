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
exports.getPatientController = exports.getPatientsController = exports.createPatientController = void 0;
const patientService_1 = require("../services/patientService");
const createPatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body.patient;
        const patient = yield (0, patientService_1.createPatient)(body);
        console.log(patient);
        res.status(200).send(patient);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createPatientController = createPatientController;
const getPatientsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield (0, patientService_1.getPatients)();
        res.status(200).send(patients);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getPatientsController = getPatientsController;
const getPatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const patient = yield (0, patientService_1.getPatient)(id);
        res.status(200).send(patient);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getPatientController = getPatientController;
