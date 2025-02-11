"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = require("./routes/user.routes");
const auth_routes_1 = require("./routes/auth.routes");
const file_routes_1 = require("./routes/file.routes");
const patient_routes_1 = require("./routes/patient.routes");
const appointment_routes_1 = require("./routes/appointment.routes");
// import { router as doctorRoutes } from './routes/doctor.routes';
const client_routes_1 = require("./routes/client.routes");
const services_routes_1 = require("./routes/services.routes");
const payment_routes_1 = require("./routes/payment.routes");
const identification_routes_1 = require("./routes/identification.routes");
const identificationTypes_routes_1 = require("./routes/identificationTypes.routes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
//middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
//routes
app.use('/api', user_routes_1.router, auth_routes_1.router, file_routes_1.router, patient_routes_1.router, appointment_routes_1.router, 
// doctorRoutes, 
client_routes_1.router, services_routes_1.router, payment_routes_1.router, identification_routes_1.router, identificationTypes_routes_1.router);
app.use(express_1.default.static('images'));
app.get('/ping', (_req, res) => {
    console.log('someone pinged me');
    res.send('pong');
});
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
