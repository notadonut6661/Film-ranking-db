"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const ActorPhoto_class_1 = require("./ActorPhoto.class");
const Actors_class_1 = require("./Actors.class");
const Film_class_1 = require("./Film.class");
const Users_class_1 = require("./Users.class");
exports.Routes = [
    { name: 'film', method: (new Film_class_1.Film()) },
    { name: 'users', method: (new Users_class_1.Users()) },
    { name: 'actorPhoto', method: (new ActorPhoto_class_1.ActorPhoto()) },
    { name: 'actors', method: (new Actors_class_1.Actors()) }
];
