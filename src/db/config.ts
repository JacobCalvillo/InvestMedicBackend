import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();


//const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USERNAME as string, process.env.DB_PASSWORD, {
//    host: process.env.DB_HOST,
//    port: process.env.DB_PORT as unknown as number,
//    dialect: 'postgres',
//    dialectOptions: {
//        ssl: {
//            require: true,
//            rejectUnauthorized: false
//        }
//    }
//})

 const sequelize = new Sequelize('innovamedic', 'postgres', '1234', {
   host: 'localhost',
   port: 5432,
   dialect: 'postgres',
 })

sequelize.sync({ force: true })  // ⚠ Esto eliminará y recreará todas las tablas
  .then(() => {
    console.log("Base de datos sincronizada correctamente.");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
});


export default sequelize;
