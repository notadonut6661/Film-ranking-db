import { ApplyRouting } from './src/Routes/ApplyRouting';
import path from 'path';
import dbConnection from './src/helpers/dbConnection';
import express from 'express';
import { config } from 'dotenv';
import { Auth } from './src/Routes/Auth.class';
import bodyParser from 'body-parser';
import cors from 'cors';  

config();

const app = express();
const x = new Auth();

app.use(cors({
  origin: '192.168.50.18' 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

ApplyRouting(app);

app.post('/auth/login', x.Login);
app.post('/auth/signup', x.Signup);


app.listen(4054, '192.168.50.18');