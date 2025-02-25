import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import apicache from 'apicache'
import { router as userRoutes } from './routes/user.routes';
import { router as fileRoutes } from './routes/file.routes';
import { router as patientRoutes } from './routes/patient.routes';
import { router as identificationTypeRoutes } from './routes/identificationTypes.routes';
import { router as medicalPractitionerRoutes } from './routes/medicalpractitioner.routes';
import { router as medicalPractitionerAvailabilityRoutes } from './routes/medicalpractitionerAvailability.routes';
import { router as appointmentRoutes } from './routes/appointment.routes';
import { router as statusRoutes } from './routes/status.routes';
import { router as paymentMethodRoutes } from './routes/paymentmethod.routes';
import { router as paymentRoutes } from './routes/payment.routes';
import { router as emailRoutes } from './routes/email.routes';
import { router as clientRoutes } from './routes/client.routes';
import { router as serviceRoutes } from './routes/service.routes';
// import { router as identificationRoutes } from './routes/identification.routes';


const app = express();
const cache = apicache.middleware;
const PORT = 5000;

//middleware
app.use(cors(/*{
    origin: "*",
    credentials: true,
    maxAge: 1800,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}*/));

app.use(cache('5 minutes'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


//routes
app.use('/api/v1',
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
        // identificationRoutes,
        identificationTypeRoutes,
        emailRoutes
    );


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
})


