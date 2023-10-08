"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var RouteFactory_class_1 = require("./RouteFactory.class");
var RouteFactory_class_2 = require("./RouteFactory.class");
function Router(app) {
    Object.values(RouteFactory_class_1.Routes).forEach(function (name) {
        var currRoute = RouteFactory_class_2.RouteFactory.Create(name);
        console.log(name.toLowerCase());
        app.get("/".concat(name.toLowerCase(), "/*"), currRoute.Get);
        app.post("/".concat(name.toLowerCase()), currRoute.Post);
        app.patch("/".concat(name.toLowerCase(), "/*"), currRoute.Patch);
        app.delete("/".concat(name.toLowerCase(), "/*"), currRoute.Delete);
    });
}
exports.Router = Router;
