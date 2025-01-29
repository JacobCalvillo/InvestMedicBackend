import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();


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

const sequelize = new Sequelize('innovamedic', 'postgres', '1234', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
})

const startServer = async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
  
      // Sincronizar los modelos con la base de datos
      await sequelize.sync({ alter: true });
      console.log('All models were synchronized successfully.');
  
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
};

const resetDatabase = async () => {
    try {
      // Sincroniza todos los modelos con la base de datos y los elimina
      await sequelize.sync({ force: true });
  
      console.log('Base de datos reiniciada con éxito');
    } catch (error) {
      console.error('Error al reiniciar la base de datos:', error);
    } finally {
      // Cerrar la conexión a la base de datos
      await sequelize.close();
    }
};
//resetDatabase()
startServer();

export default sequelize;
