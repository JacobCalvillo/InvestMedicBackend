import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import apicache from "apicache";
import dotenv from "dotenv";

// Importación de rutas
import { router as userRoutes } from "./routes/user.routes";
import { router as fileRoutes } from "./routes/file.routes";
import { router as patientRoutes } from "./routes/patient.routes";
import { router as identificationTypeRoutes } from "./routes/identificationTypes.routes";
import { router as medicalPractitionerRoutes } from "./routes/medicalpractitioner.routes";
import { router as medicalPractitionerAvailabilityRoutes } from "./routes/medicalpractitionerAvailability.routes";
import { router as appointmentRoutes } from "./routes/appointment.routes";
import { router as statusRoutes } from "./routes/status.routes";
import { router as paymentMethodRoutes } from "./routes/paymentmethod.routes";
import { router as paymentRoutes } from "./routes/payment.routes";
import { router as emailRoutes } from "./routes/email.routes";
import { router as clientRoutes } from "./routes/client.routes";
import { router as serviceRoutes } from "./routes/service.routes";
import { router as webhookRoutes } from "./routes/webhook.routes";

dotenv.config();

const app = express();
const cache = apicache.middleware;
const PORT = Number(process.env.PORT) || 3000;

const allowedOrigins = [
    "https://app-front-medic.vercel.app",
    "https://app-front-medic-jacobcalvillos-projects.vercel.app",
    "http://localhost:5173",
];

// Middleware para CORS
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}));


// Middleware estándar
app.use(cache("5 minutes"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Rutas de la API
app.use(
    "/api/v1",
    userRoutes,
    fileRoutes,
    patientRoutes,
    medicalPractitionerRoutes,
    medicalPractitionerAvailabilityRoutes,
    paymentMethodRoutes,
    paymentRoutes,
    statusRoutes,
    appointmentRoutes,
    clientRoutes,
    serviceRoutes,
    identificationTypeRoutes,
    emailRoutes,
    webhookRoutes
);

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("¡Servidor en funcionamiento!");
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Manejo de señales para detener el servidor correctamente
process.once("SIGUSR2", () => {
    process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", () => {
    process.kill(process.pid, "SIGINT");
});
