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
exports.Actors = void 0;
const dbConnection_1 = __importDefault(require("../helpers/dbConnection"));
const Route_class_1 = require("./Route.class");
const uriDecoder_1 = require("helpers/uriDecoder");
class Actors extends Route_class_1.Route {
    constructor() {
        super();
        this.routeName = "actors";
        this.dbName = "actors";
        this.uriDecoder = new uriDecoder_1.UriDecoder([{ name: 'title', type: 'string' }, { name: 'query', type: [{ name: "name", type: "string" }, { name: "length", type: "number" }] }]);
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = this.uriDecoder.Decode(req.originalUrl);
                if (typeof query === 'string')
                    return;
                const ActorsUncutArr = yield (yield dbConnection_1.default).query(`SELECT * FROM ${this.dbName} WHERE name LIKE "${query.name}%"`);
                res.json(ActorsUncutArr.slice(0, +query.length));
            }
            catch (err) {
                console.log(err);
                res.status(404).json({ Error: "Wrong parameters" });
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
exports.Actors = Actors;
