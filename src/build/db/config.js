"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USERNAME as string, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT as unknown as number,
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// })
const sequelize = new sequelize_1.Sequelize('innovamedic', 'postgres', '1234', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Database connection established successfully.');
        // Sincronizar los modelos con la base de datos
        yield sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
const resetDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Sincroniza todos los modelos con la base de datos y los elimina
        yield sequelize.sync({ force: true });
        console.log('Base de datos reiniciada con éxito');
    }
    catch (error) {
        console.error('Error al reiniciar la base de datos:', error);
    }
    finally {
        // Cerrar la conexión a la base de datos
        yield sequelize.close();
    }
});
//resetDatabase()
startServer();
exports.default = sequelize;
