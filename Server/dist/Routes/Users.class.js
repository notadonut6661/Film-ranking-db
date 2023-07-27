"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const Route_class_1 = require("./Route.class");
const uriDecoder_1 = require("../helpers/uriDecoder");
class Users extends Route_class_1.Route {
    constructor() {
        super();
        this.routeName = "users";
        this.uriDecoder = new uriDecoder_1.UriDecoder([{ name: "title", type: "string" }, { name: "id", type: "number" }]);
        this.dbName = "users";
        this.Get = this.Get.bind(this);
        this.Post = this.Post.bind(this);
    }
    Post(req, res) {
        throw new Error("Method not implemented.");
    }
    Patch(req, res) {
        throw new Error("Method not implemented.");
    }
    Delete(req, res) {
        throw new Error("Method not implemented.");
    }
}
exports.Users = Users;
