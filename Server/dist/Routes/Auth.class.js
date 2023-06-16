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
        this.getQueryDataType = [];
    }
    Signup(req, res) {
        console.log(11);
        res.status(200).send('20');
    }
    Login(req, res) {
        throw new Error("Method not implemented.");
    }
}
exports.Auth = Auth;
