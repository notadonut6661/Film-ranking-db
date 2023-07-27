"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRouteFactory = void 0;
const Route_class_1 = require("./Route.class");
const uriDecoder_1 = require("helpers/uriDecoder");
class AbstractRouteFactory {
    static Create(...f) {
        class F extends Route_class_1.Route {
            constructor() {
                super();
                this.N = f[0] ? () => { } : 0;
                this.routeName = "";
                this.dbName = "";
                this.uriDecoder = new uriDecoder_1.UriDecoder([]);
            }
            Post(req, res) {
                throw new Error('Method not implemented.');
            }
            Patch(req, res) {
                throw new Error('Method not implemented.');
            }
            Delete(req, res) {
                throw new Error('Method not implemented.');
            }
        }
        return new F();
    }
}
exports.AbstractRouteFactory = AbstractRouteFactory;
