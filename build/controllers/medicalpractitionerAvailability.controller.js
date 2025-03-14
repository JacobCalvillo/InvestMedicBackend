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
exports.getMedicalPractitionerAvailabilityById = exports.getMedicalPractitionerAvailabilityController = void 0;
const medicalpractitionerAvailability_service_1 = require("../services/medicalpractitionerAvailability.service");
const error_handle_1 = require("../utils/error.handle");
const getMedicalPractitionerAvailabilityController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicalPractitionerAvailability = yield (0, medicalpractitionerAvailability_service_1.getMedicalPractitionerAvailability)();
        if (medicalPractitionerAvailability) {
            res.status(200).send(medicalPractitionerAvailability);
        }
        else {
            res.status(400).send(medicalPractitionerAvailability);
        }
    }
    catch (error) {
        console.error(error);
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_MEDICAL_PRACTITIONER_AVAILABILITY', error);
    }
});
exports.getMedicalPractitionerAvailabilityController = getMedicalPractitionerAvailabilityController;
const getMedicalPractitionerAvailabilityById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const medicalPractitionerAvailability = yield (0, medicalpractitionerAvailability_service_1.getMedicalPractitionerAvailabilityByMedicalId)(Number(id));
        if (medicalPractitionerAvailability) {
            res.status(200).send(medicalPractitionerAvailability);
        }
        else {
            res.status(400).send(medicalPractitionerAvailability);
        }
    }
    catch (error) {
        console.log(error);
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_MEDICAL_PRACTITIONER_AVAILABILITY_BY_ID', error);
    }
});
exports.getMedicalPractitionerAvailabilityById = getMedicalPractitionerAvailabilityById;
