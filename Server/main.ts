import { Router } from './Routes/Router';
import path from 'path';
import dbConnection from './helpers/dbConnection';
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

Router(app);

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})