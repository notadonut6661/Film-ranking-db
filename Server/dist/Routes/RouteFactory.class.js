"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteFactory = exports.Routes = void 0;
var ActorPhoto_class_1 = require("./ActorPhoto.class");
var Actors_class_1 = require("./Actors.class");
var Auth_class_1 = require("./Auth.class");
var TemplateRoute_class_1 = require("./TemplateRoute.class");
var Routes;
(function (Routes) {
    Routes["FILM"] = "FILM";
    Routes["SERIES"] = "SERIES";
    Routes["AUTH"] = "AUTH";
    Routes["ACTORS"] = "ACTORS";
    Routes["ACTOR_PHOTO"] = "ACTOR_PHOTO";
    Routes["USERS"] = "USERS";
})(Routes = exports.Routes || (exports.Routes = {}));
var RouteFactory = (function () {
    function RouteFactory() {
    }
    RouteFactory.Create = function (route) {
        switch (route) {
            case "FILM":
                return new TemplateRoute_class_1.TemplateRoute("film", "film");
            case "SERIES":
                return new TemplateRoute_class_1.TemplateRoute("series", "series");
            case "AUTH":
                return new Auth_class_1.Auth();
            case "ACTORS":
                return new Actors_class_1.Actors();
            case "ACTOR_PHOTO":
                return new ActorPhoto_class_1.ActorPhoto();
            case "USERS":
                return new TemplateRoute_class_1.TemplateRoute("users", "users");
            default:
                throw new Error('');
        }
    };
    return RouteFactory;
}());
exports.RouteFactory = RouteFactory;
