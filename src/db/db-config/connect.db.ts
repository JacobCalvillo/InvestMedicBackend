import { Client } from 'pg';
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    user: process.env.DB_DEV_USER,
    host: process.env.DB_DEV_HOST,
    database: process.env.DB_DEV_DATABASE,
    password: process.env.DB_DEV_PASSWORD,
    port: Number(process.env.DB_DEV_PORT)
});

client.connect()
    .then(() => {
        console.log('connected to db');
    })
    .catch(err => {
        console.log('Error de conexion', err);
    });

export default client;