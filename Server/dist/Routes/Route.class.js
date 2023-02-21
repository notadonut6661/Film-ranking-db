"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uriDecoder_1 = require("../helpers/uriDecoder");
const uriParamsTypes_1 = require("../data/uriParamsTypes");
class Route {
    constructor() {
        this.postRequestDataType = 'application/json';
    }
    getDecodedURI(HTTPMethod, uri) {
        const uriDecoderE = new uriDecoder_1.uriDecoder(uriParamsTypes_1.uriParamsType[this.routeName][HTTPMethod]);
        return uriDecoderE.Decode(uri);
    }
}
exports.default = Route;
