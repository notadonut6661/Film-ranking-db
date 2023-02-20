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
exports.Film = void 0;
const dbConnection_1 = __importDefault(require("../helpers/dbConnection"));
const Route_class_1 = __importDefault(require("./Route.class"));
class Film extends Route_class_1.default {
    constructor() {
        super();
        this.Get = this.Get.bind(this);
        this.routeName = "Film";
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this);
            const { id } = this.getDecodedURI("GET", req.baseUrl);
            res.json(yield (yield dbConnection_1.default).query(`SELECT * FROM films WHERE id = ${id}`));
        });
    }
    // TODO: if  request content type is not equal to application/json we should response with an error
    Post(req, res) {
        console.log(1);
    }
    Delete(req, res) {
        console.log(2);
    }
    Patch(req, res) {
        console.log(2);
    }
}
exports.Film = Film;
