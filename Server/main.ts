import { Router } from './Routes/Router';
import path from 'path';
import dbConnection from './helpers/dbConnection';
import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

Router(app);


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})