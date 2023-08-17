"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var dbConnection_1 = __importDefault(require("../helpers/dbConnection"));
var generateSha256_1 = require("../utils/generateSha256");
var Route = (function () {
    function Route() {
        this.MediaType = 'application/json';
        this.Get = this.Get.bind(this);
        this.Post = this.Post.bind(this);
        this.uriDecoder = null;
    }
    Route.prototype.Get = function (req, res) {
        res.status(404).send("Not Implemented");
    };
    Route.prototype.Post = function (req, res) {
        res.status(404).send("Not Implemented");
    };
    Route.prototype.Patch = function (req, res) {
        res.status(404).send("Not Implemented");
    };
    Route.prototype.Delete = function (req, res) {
        res.status(404).send("Not Implemented");
    };
    Route.prototype.getAuthHeader = function (req) {
        var _a;
        return (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    };
    Route.prototype.ValidateRequest = function (req) {
        var _a;
        return !!((_a = this.getAuthHeader(req)) === null || _a === void 0 ? void 0 : _a.match(/^(\w|\d){3,15}:(\w|\W){6,30}$/));
    };
    Route.prototype.Authorization = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var authHeader, input, realPass, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authHeader = this.getAuthHeader(req);
                        if (!this.ValidateRequest(req)) {
                            return [2, false];
                        }
                        input = {
                            email: authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(':')[0],
                            password: authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(':')[1]
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, dbConnection_1.default];
                    case 2: return [4, (_a.sent()).query("SELECT passwordHash FROM users WHERE email = ".concat(input.email))];
                    case 3:
                        realPass = _a.sent();
                        return [3, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [2, false];
                    case 5:
                        if (!realPass || !input.password)
                            return [2, false];
                        return [2, realPass === (0, generateSha256_1.generateSha256)(input.password)];
                }
            });
        });
    };
    return Route;
}());
exports.Route = Route;
