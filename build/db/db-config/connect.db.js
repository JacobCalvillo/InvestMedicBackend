"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.DATABASE_URL_SUPABASE;
// const pool = new Pool({
//     user: process.env.DB_DEV_USER,
//     host: process.env.DB_DEV_HOST,
//     database: process.env.DB_DEV_DATABASE,
//     password: process.env.DB_DEV_PASSWORD,
//     port: Number(process.env.DB_DEV_PORT)
// });
console.log(connectionString);
const client = new pg_1.Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
    statement_timeout: 30000
});
exports.default = client;
