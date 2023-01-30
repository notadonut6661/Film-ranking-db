"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Film = void 0;
const Route_class_1 = __importDefault(require("./Route.class"));
class Film extends Route_class_1.default {
    Get(req, res) {
        console.log(this === undefined);
        // const { id } = this.getDecodedURI(RequestType.GET, req.baseUrl);
        // res.json(await (await dbConnection).query(`SELECT * FROM films WHERE id = ${id}`));
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
