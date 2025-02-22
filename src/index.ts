import express from 'express';
import cookieParser from 'cookie-parser';
import { router as userRoutes } from './routes/user.routes';
import { router as fileRoutes } from './routes/file.routes';
import { router as patientRoutes } from './routes/patient.routes';
// import { router as appointmentRoutes } from './routes/appointment.routes';
import { router as clientRoutes } from './routes/client.routes';
// import { router as serviceRoutes } from './routes/services.routes';
// import { router as paymentRoutes } from './routes/payment.routes';
// import { router as identificationRoutes } from './routes/identification.routes';
import { router as identificationTypeRoutes } from './routes/identificationTypes.routes';
import { router as emailRoutes } from './routes/email.routes';
import cors from 'cors';
import apicache from 'apicache'

const app = express();
const cache = apicache.middleware;
const PORT = 5000;

//middleware
app.use(cors({
    origin: "*",
    credentials: true,
    maxAge: 1800,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(cache('5 minutes'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


//routes
app.use('/api/v1',
        userRoutes,
        fileRoutes, 
        patientRoutes,
        // appointmentRoutes,
        clientRoutes,
        // serviceRoutes,
        // paymentRoutes,
        // identificationRoutes,
        identificationTypeRoutes,
        emailRoutes
    );


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
})


