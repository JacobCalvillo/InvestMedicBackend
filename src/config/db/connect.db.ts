import { Pool } from 'pg';
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL_SUPABASE as string

// const pool = new Pool({
//     user: process.env.DB_DEV_USER,
//     host: process.env.DB_DEV_HOST,
//     database: process.env.DB_DEV_DATABASE,
//     password: process.env.DB_DEV_PASSWORD,
//     port: Number(process.env.DB_DEV_PORT)
// });


export const client = (): Pool => {
    return new Pool({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false },
        statement_timeout: 30000
    })
}
