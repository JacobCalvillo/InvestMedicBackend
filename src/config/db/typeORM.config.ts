import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL_SUPABASE,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: false,
    logging: process.env.NODE_ENV === "development",
    entities: ["src/infrastructure/database/entities/**/*.entity.ts"],
    migrations: ["src/infrastructure/database/migrations/**/*.ts"],
    subscribers: ["src/infrastructure/database/subscribers/**/*.ts"],
});

export const initializeDatabase = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        console.log("Database connection established");
    } catch (error) {
        console.error("Error during database initialization", error);
        throw error;
    }
};