"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const apicache_1 = __importDefault(require("apicache"));
const user_routes_1 = require("./routes/user.routes");
const file_routes_1 = require("./routes/file.routes");
const patient_routes_1 = require("./routes/patient.routes");
const identificationTypes_routes_1 = require("./routes/identificationTypes.routes");
const medicalpractitioner_routes_1 = require("./routes/medicalpractitioner.routes");
const medicalpractitionerAvailability_routes_1 = require("./routes/medicalpractitionerAvailability.routes");
const appointment_routes_1 = require("./routes/appointment.routes");
const status_routes_1 = require("./routes/status.routes");
const paymentmethod_routes_1 = require("./routes/paymentmethod.routes");
const payment_routes_1 = require("./routes/payment.routes");
const email_routes_1 = require("./routes/email.routes");
const client_routes_1 = require("./routes/client.routes");
const service_routes_1 = require("./routes/service.routes");
const webhook_routes_1 = require("./routes/webhook.routes");
// import { router as identificationRoutes } from './routes/identification.routes';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const cache = apicache_1.default.middleware;
const PORT = Number(process.env.PORT);
//middleware
app.use((0, cors_1.default)( /*{
    origin: "*",
    credentials: true,
    maxAge: 1800,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}*/));
app.use(cache('5 minutes'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//routes
app.use('/api/v1', user_routes_1.router, file_routes_1.router, patient_routes_1.router, medicalpractitioner_routes_1.router, medicalpractitionerAvailability_routes_1.router, paymentmethod_routes_1.router, payment_routes_1.router, status_routes_1.router, appointment_routes_1.router, client_routes_1.router, service_routes_1.router, 
// identificationRoutes,
identificationTypes_routes_1.router, email_routes_1.router, webhook_routes_1.router);
app.get('/', (req, res) => {
    res.send('¡Servidor en funcionamiento!');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
process.once('SIGUSR2', () => {
    process.kill(process.pid, 'SIGUSR2');
});
process.on('SIGINT', () => {
    process.kill(process.pid, 'SIGINT');
});
