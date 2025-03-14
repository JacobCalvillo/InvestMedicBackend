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
exports.getAllMedicalPractitionersController = void 0;
const error_handle_1 = require("../utils/error.handle");
const medicalpractitioner_service_1 = require("../services/medicalpractitioner.service");
const getAllMedicalPractitionersController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicalPractitioners = yield (0, medicalpractitioner_service_1.getAllMedicalPractitioners)();
        if (medicalPractitioners) {
            res.status(200).send(medicalPractitioners);
        }
        else {
            res.status(400).send(medicalPractitioners);
        }
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_MEDICAL_PRACTITIONERS', error);
    }
});
exports.getAllMedicalPractitionersController = getAllMedicalPractitionersController;
