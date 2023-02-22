"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uriDecoder_1 = require("../helpers/uriDecoder");
const uriParamsTypes_1 = require("../data/interfaces/uriParamsTypes");
class Route {
    constructor() {
        this.postRequestDataType = 'application/json';
        this.Get = this.Get.bind(this);
        this.Post = this.Post.bind(this);
    }
    Authorization(req) {
        var _a;
        return (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    }
    getDecodedURI(HTTPMethod, uri) {
        const uriDecoderE = new uriDecoder_1.uriDecoder(uriParamsTypes_1.uriParamsType[this.routeName][HTTPMethod]);
        return uriDecoderE.Decode(uri);
    }
}
exports.default = Route;
