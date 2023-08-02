"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
var Route_class_1 = require("./Route.class");
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        var _this = _super.call(this) || this;
        _this.routeName = "auth";
        _this.dbName = "users";
        return _this;
    }
    Auth.prototype.Post = function (req, res) {
    };
    Auth.prototype.Signup = function (req, res) {
        console.log(11);
        res.status(200).send('20');
    };
    Auth.prototype.Login = function (req, res) {
        throw new Error("Method not implemented.");
    };
    return Auth;
}(Route_class_1.Route));
exports.Auth = Auth;
