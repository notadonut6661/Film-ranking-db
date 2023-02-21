"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const Routes_1 = require("./Routes");
// FIXME add to Routes parametre to insure that we should use symbols after name
function Router(app) {
    Routes_1.Routes.forEach(({ name, method }) => {
        app.get(`/${name}/*`, method.Get);
        app.post(`/${name}`, method.Post);
        app.patch(`/${name}/*`, method.Patch);
        app.delete(`/${name}/*`, method.Delete);
    });
}
exports.Router = Router;
