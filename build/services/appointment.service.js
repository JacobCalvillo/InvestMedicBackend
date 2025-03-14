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
exports.updateStatusAppointment = exports.updateAppointment = exports.createAppointment = exports.getAppointments = void 0;
const connect_db_1 = __importDefault(require("../db/db-config/connect.db"));
const getAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield connect_db_1.default.query("SELECT * FROM Appointment");
        return appointments.rows[0] || null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAppointments = getAppointments;
const createAppointment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data);
        const newAppointment = yield connect_db_1.default.query(`
                    INSERT INTO Appointment (
                        start_time,
                        end_time,
                        reason,
                        status_id,
                        patient_id,
                        medical_practitioner_id,
                        service_id
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [
            data.startTime,
            data.endTime || null,
            data.reason,
            data.statusId,
            data.patientId,
            data.medicalPractitionerId,
            data.serviceId
        ]);
        return newAppointment.rows[0] || null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.createAppointment = createAppointment;
const updateAppointment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateAppointment = yield connect_db_1.default.query(`
                        UPDATE Appointment 
                        SET start_time = $1,
                            end_time = $2,
                            reason = $3,
                            status_id = $4,
                            patient_id = $5,
                            medical_practitioner_id = $6,
                            service_id = $7
                            
                            WHERE id = $8;`, [
            data.startTime,
            data.endTime,
            data.reason,
            data.statusId,
            data.patientId,
            data.medicalPractitionerId,
            data.serviceId,
            data.id
        ]);
        return updateAppointment.rows[0] || null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.updateAppointment = updateAppointment;
const updateStatusAppointment = (statusId, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateStatus = yield connect_db_1.default.query(`
                UPDATE Appointment
                SET status_id = $1
                WHERE id = $2`, [
            statusId,
            id
        ]);
        return updateStatus.rows[0] || null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.updateStatusAppointment = updateStatusAppointment;
