"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./Routes/Router");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const Auth_class_1 = require("./Routes/Auth.class");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const x = new Auth_class_1.Auth();
app.use((0, cors_1.default)({
    origin: 'http://192.168.0.224:3000' // Replace with your allowed origin
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
(0, Router_1.Router)(app);
app.post('/auth/login', x.Login);
app.post('/auth/signup', x.Signup);
app.listen(4054, '192.168.0.224');
