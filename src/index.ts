import express from 'express';
import cookieParser from 'cookie-parser';
import { router as userRoutes } from './routes/user.routes';
import { router as authRoutes } from './routes/auth.routes';
import { router as fileRoutes } from './routes/file.routes';
import { router as patientRoutes } from './routes/patient.routes';
import { router as appointmentRoutes } from './routes/appointment.routes';
// import { router as doctorRoutes } from './routes/doctor.routes';
import { router as clientRoutes } from './routes/client.routes';
import { router as serviceRoutes } from './routes/services.routes';
import { router as paymentRoutes } from './routes/payment.routes';
import { router as identificationRoutes } from './routes/identification.routes';
import { router as identificationTypeRoutes } from './routes/identificationTypes.routes';
import cors from 'cors';

const app = express();

const PORT = 5000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use(cors());

//routes
app.use('/api',
        userRoutes, 
        authRoutes, 
        fileRoutes, 
        patientRoutes, 
        appointmentRoutes, 
        // doctorRoutes, 
        clientRoutes, 
        serviceRoutes,
        paymentRoutes,
        identificationRoutes,
        identificationTypeRoutes
    );


app.use(express.static('images'));


app.get('/ping', (_req, res) => {
    console.log('someone pinged me');
    res.send('pong');
});     

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
