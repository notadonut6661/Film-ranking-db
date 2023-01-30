"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const Routes_1 = require("./Routes");
function Router(app) {
    Routes_1.Routes.forEach(({ path, method }) => {
        app.get(`/${path}/*`, method.Get);
        app.post(`/${path}/*`, method.Post);
        app.patch(`/${path}/*`, method.Patch);
        app.delete(`/${path}/*`, method.Delete);
    });
}
exports.Router = Router;
