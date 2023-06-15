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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const Route_class_1 = __importDefault(require("./Route.class"));
const dbConnection_1 = __importDefault(require("../helpers/dbConnection"));
class Auth extends Route_class_1.default {
    constructor() {
        super();
        this.routeName = "auth";
        this.dataType = [{ name: "title", type: "string" }, { name: "id", type: "number" }];
        this.dbName = "auth";
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = this.getDecodedURI("GET", req.originalUrl);
            try {
                res.status(200).json(yield (yield dbConnection_1.default).query(`SELECT * FROM ${this.dbName} WHERE id = ${id}`));
            }
            catch (_a) {
                res.sendStatus(404);
            }
        });
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
