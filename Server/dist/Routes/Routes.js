"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const Film_class_1 = require("./Film.class");
exports.Routes = [
    { name: 'film', method: (new Film_class_1.Film()) },
];
