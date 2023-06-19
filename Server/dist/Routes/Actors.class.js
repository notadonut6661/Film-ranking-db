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
const Route_class_1 = __importDefault(require("./Route.class"));
class Actors extends Route_class_1.default {
    constructor() {
        super();
        this.routeName = "actors";
        this.dbName = "actors";
        this.getQueryDataType = [{ name: 'title', type: 'string' }, { name: 'query', type: [{ name: "name", type: "string" }] }];
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = this.getDecodedURI("GET", req.originalUrl);
                // if (typeof query === 'string') return;
                // res.json(await (await dbConnection).query(`SELECT * FROM ${this.dbName} WHERE id = ${query['id']}`));
                res.json(query);
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
