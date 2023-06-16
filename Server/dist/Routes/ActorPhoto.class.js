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
exports.ActorPhoto = void 0;
const path_1 = __importDefault(require("path"));
const Route_class_1 = __importDefault(require("./Route.class"));
const dbConnection_1 = __importDefault(require("../helpers/dbConnection"));
class ActorPhoto extends Route_class_1.default {
    constructor() {
        super();
        this.getQueryDataType = [{ name: "title", type: "string" }, { name: "id", type: "number" }];
        this.routeName = "ActorPhoto";
        this.dbName = "actors";
        this.Get = this.Get.bind(this);
        this.Post = this.Post.bind(this);
    }
    Get(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = this.getDecodedURI("GET", req.originalUrl);
            console.log(id);
            const pathToProfilePhoto = (_a = (yield (yield dbConnection_1.default).query(`SELECT * FROM ${this.dbName} WHERE id = ${id}`))[0]) === null || _a === void 0 ? void 0 : _a.profile_picture;
            try {
                res.status(200).sendFile(path_1.default.resolve(pathToProfilePhoto));
            }
            catch (_b) {
                res.sendStatus(503);
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
exports.ActorPhoto = ActorPhoto;
