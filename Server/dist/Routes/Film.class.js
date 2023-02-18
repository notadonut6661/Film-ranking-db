"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Film = void 0;
const Route_class_1 = __importDefault(require("./Route.class"));
const requestTypes_interface_1 = require("../data/requestTypes.interface");
class Film extends Route_class_1.default {
    constructor() {
        super();
        this.Get = this.Get.bind(this);
    }
    Get(req, res) {
        console.log(this);
        const { id } = this.getDecodedURI(requestTypes_interface_1.RequestType.GET, req.baseUrl);
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
    getDecodedURI() {
    }
}
exports.Film = Film;
