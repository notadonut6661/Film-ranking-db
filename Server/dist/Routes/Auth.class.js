"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
class Auth {
    constructor() {
        this.routeName = "auth";
        this.dbName = "users";
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
