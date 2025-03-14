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
exports.handleStripeEvent = void 0;
const appointment_service_1 = require("../services/appointment.service");
const handleStripeEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const appointmentId = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.appointment_id;
            if (appointmentId) {
                yield (0, appointment_service_1.updateStatusAppointment)(Number(appointmentId), 2);
                return `Cita ${appointmentId} pagada`;
            }
            return `Cita no encontrada`;
        }
    }
    catch (e) {
        console.log(e);
        return null;
    }
});
exports.handleStripeEvent = handleStripeEvent;
