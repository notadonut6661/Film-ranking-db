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
const uriDecoder_1 = require("../helpers/uriDecoder");
const uriParamsTypes_1 = require("../data/interfaces/uriParamsTypes");
const dbConnection_1 = __importDefault(require("../helpers/dbConnection"));
class Route {
    constructor() {
        this.postRequestDataType = 'application/json';
        this.Get = this.Get.bind(this);
        this.Post = this.Post.bind(this);
    }
    Authorization(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            // FIXME validate with regex
            const input = {
                name: authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(':')[0],
                password: authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(':')[1]
            };
            let realPass;
            try {
                realPass = yield (yield dbConnection_1.default).query(`SELECT * FROM users WHERE name = ${input.name}`);
            }
            catch (_b) {
                return false;
            }
            return realPass === input.password;
        });
    }
    getDecodedURI(HTTPMethod, uri) {
        const uriDecoderE = new uriDecoder_1.uriDecoder(uriParamsTypes_1.uriParamsType[this.routeName][HTTPMethod]);
        return uriDecoderE.Decode(uri);
    }
}
exports.default = Route;
