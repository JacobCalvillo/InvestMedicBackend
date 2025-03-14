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
exports.createPatientController = exports.getPatientByIdController = exports.getAllPatientsController = void 0;
const patient_service_1 = require("../services/patient.service");
const error_handle_1 = require("../utils/error.handle");
const getAllPatientsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield (0, patient_service_1.getAllPatients)();
        if (!patients) {
            res.status(404).send({ message: patients });
        }
        res.status(200).send(patients);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_PATIENTS', error);
    }
});
exports.getAllPatientsController = getAllPatientsController;
const getPatientByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const patient = yield (0, patient_service_1.getPatientById)(Number(id));
        if (!patient) {
            res.status(404).send({ message: patient });
        }
        res.status(200).send(patient);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_PATIENT', error);
    }
});
exports.getPatientByIdController = getPatientByIdController;
const createPatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = req.body;
        console.log(patient);
        const { identificationTypeId } = req.query;
        const newPatient = yield (0, patient_service_1.createPatientWithIdentification)(patient, req.query.identificationNumber, Number(identificationTypeId), req.query.identificationUrl);
        if (newPatient) {
            res.status(201).send(newPatient);
        }
        else {
            res.status(400).send(patient);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE_PATIENT', error);
    }
});
exports.createPatientController = createPatientController;
