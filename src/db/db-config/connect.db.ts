import { Pool } from 'pg';
import dotenv from "dotenv";

dotenv.config();

// const pool = new Pool({
//     user: process.env.DB_DEV_USER,
//     host: process.env.DB_DEV_HOST,
//     database: process.env.DB_DEV_DATABASE,
//     password: process.env.DB_DEV_PASSWORD,
//     port: Number(process.env.DB_DEV_PORT)
// });

const client = new Pool(
    {
        connectionString: process.env.DATABASE_URL
    }
);


export default client;