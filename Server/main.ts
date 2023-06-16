import { Router } from './Routes/Router';
import path from 'path';
import dbConnection from './helpers/dbConnection';
import express from 'express';
import { config } from 'dotenv';
import { Auth } from './Routes/Auth.class';

config();

const app = express();
const x = new Auth();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

Router(app);

app.post('/auth/login', x.Login);
app.post('/auth/signup', x.Signup);



app.listen(4000, '192.168.0.164');