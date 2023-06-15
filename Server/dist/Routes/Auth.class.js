"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const Route_class_1 = __importDefault(require("./Route.class"));
class Auth extends Route_class_1.default {
    constructor() {
        super();
        this.routeName = "auth";
        this.dbName = "users";
        this.dataType = [];
    }
    Get(req, res) {
        throw new Error("Method not implemented.");
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
exports.Auth = Auth;
