import { createConnection } from "mariadb";
import { config } from "dotenv";
import path from 'path';

config({ path: path.resolve(__dirname, '../../data/.env')});

export default createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 3306
});