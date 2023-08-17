"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var RouteFactory_class_1 = require("./RouteFactory.class");
var RouteFactory_class_2 = require("./RouteFactory.class");
function Router(app) {
    Object.values(RouteFactory_class_1.Routes).forEach(function (name) {
        var currRoute = RouteFactory_class_2.RouteFactory.Create(name);
        console.log(name);
        app.get("/".concat(name, "/*"), currRoute.Get);
        app.post("/".concat(name), currRoute.Post);
        app.patch("/".concat(name, "/*"), currRoute.Patch);
        app.delete("/".concat(name, "/*"), currRoute.Delete);
    });
}
exports.Router = Router;
