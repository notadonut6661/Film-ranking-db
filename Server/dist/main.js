"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Router_1 = require("./Routes/Router");
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var Auth_class_1 = require("./Routes/Auth.class");
var cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
var app = (0, express_1.default)();
var x = new Auth_class_1.Auth();
app.use((0, cors_1.default)({
    origin: '192.168.50.18'
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
(0, Router_1.Router)(app);
app.post('/auth/login', x.Login);
app.post('/auth/signup', x.Signup);
app.listen(4054, '192.168.50.18');
