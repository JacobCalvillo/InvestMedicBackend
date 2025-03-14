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
exports.getMedicalPractitionerAvailabilityByMedicalId = exports.getMedicalPractitionerAvailability = void 0;
const connect_db_1 = __importDefault(require("../db/db-config/connect.db"));
const getMedicalPractitionerAvailability = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicalPractitionerAvailability = yield connect_db_1.default.query('SELECT * FROM medical_practitioner_availability');
        return medicalPractitionerAvailability.rows || null;
    }
    catch (error) {
        return null;
    }
});
exports.getMedicalPractitionerAvailability = getMedicalPractitionerAvailability;
const getMedicalPractitionerAvailabilityByMedicalId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM medical_practitioner_availability WHERE medical_practitioner_id = $1';
        const medicalPractitionerAvailability = yield connect_db_1.default.query(query, [id]);
        return medicalPractitionerAvailability.rows[0] || null;
    }
    catch (error) {
        return null;
    }
});
exports.getMedicalPractitionerAvailabilityByMedicalId = getMedicalPractitionerAvailabilityByMedicalId;
