import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();


const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USERNAME as string, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

// const sequelize = new Sequelize('innovamedic', 'postgres', '1234', {
//   host: 'localhost',
//   port: 5432,
//   dialect: 'postgres',
// })

const startServer = async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
  
      await sequelize.sync({ alter: true });
      console.log('All models were synchronized successfully.');
  
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
};

const dropSchema = async () => {
  try {
    await sequelize.query('DROP SCHEMA public CASCADE;');
    await sequelize.query('CREATE SCHEMA public;');
    console.log('Esquema reiniciado correctamente.');
  } catch (error) {
    console.error('Error al reiniciar el esquema:', error);
  }
};


dropSchema()
startServer();

export default sequelize;
