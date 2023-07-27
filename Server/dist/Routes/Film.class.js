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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Film = void 0;
const Route_class_1 = require("./Route.class");
const uriDecoder_1 = require("helpers/uriDecoder");
class Film extends Route_class_1.Route {
    constructor() {
        super();
        this.uriDecoder = new uriDecoder_1.UriDecoder([{ name: "title", type: "string" }, { name: "id", type: "number" }]);
        this.routeName = "Film";
        this.dbName = "films";
        this.Get = this.Get.bind(this);
        this.Post = this.Post.bind(this);
    }
    Post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            res.send(data);
        });
    }
    Delete(req, res) {
        console.log(2);
    }
    Patch(req, res) {
        console.log(2);
    }
}
exports.Film = Film;
