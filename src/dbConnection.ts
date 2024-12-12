import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';


dotenv.config({
  override: true,
  path: '.env',
});


const database = process.env.DATABASE|| ''
const user = process.env.USER || '';
const password = process.env.PASSWORD || '';
const host = process.env.HOST || '';  

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'postgres',
});


const connectDB = async (): Promise<void> => {
  try {

    await sequelize.authenticate();
    console.log('Connection established');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};


export { sequelize, connectDB };
