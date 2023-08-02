"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mariadb_1 = require("mariadb");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = (0, mariadb_1.createConnection)({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? +process.env.DB_PORT : 3306
});
