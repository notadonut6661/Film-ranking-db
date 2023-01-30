"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_METHODS = exports.DB_PASSWORD = exports.DB_HOST = void 0;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.HTTP_METHODS = [
    'Get', 'Post', 'Patch', 'Delete'
];
