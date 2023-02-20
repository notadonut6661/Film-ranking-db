"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uriDecoder = void 0;
const getNumberOfCharacterMentionInString_1 = require("../utils/getNumberOfCharacterMentionInString");
/**
 *
 * @param uriParams is an array containing all the parts of uri (part is a term that defines string in uri splitted by / sign)
 */
class uriDecoder {
    constructor(_uriParams) {
        this.uriParams = _uriParams;
    }
    /**
   * @returns Splitted URI with deleted first character slash
   */
    getSplittedUri(uri) {
        return uri.replace(/^\//, '').split('/');
    }
    getQuantityOfKeyValuePairsInRowRequestParams(rowRequestParams) {
        var _a;
        return (_a = Array.from(rowRequestParams.matchAll(/\?=/g)).length) !== null && _a !== void 0 ? _a : 0;
    }
    getKeyValuePairsAsObject(keyValuePairs) {
        const result = {};
        keyValuePairs.forEach(pair => {
            const [key, value] = pair.split('?=');
            result[key] = value;
        });
        return result;
    }
    ValidateURIParams(rowRequestParams) {
        const keyValuePairInElementQuantity = this.getQuantityOfKeyValuePairsInRowRequestParams(rowRequestParams);
        const totalQEMarksQuantity = ((0, getNumberOfCharacterMentionInString_1.getNumberOfCharacterMentionInString)(rowRequestParams, '?') + (0, getNumberOfCharacterMentionInString_1.getNumberOfCharacterMentionInString)(rowRequestParams, '='));
        if ((totalQEMarksQuantity / 2) !== keyValuePairInElementQuantity) {
            throw new Error('Not needed question or equal marks in request');
        }
    }
    organizeDecodedURI(decodedURI) {
        const organizedDecodedURI = {};
        console.log(this.uriParams, decodedURI);
        if (this.uriParams.length !== decodedURI.length) {
            throw new Error('Decoded URI length is different from expected');
        }
        decodedURI.forEach((el, i) => {
            if (!this.uriParams)
                return;
            let elType = typeof '';
            // FIXME It's validation move it to separate method
            try {
                elType = typeof JSON.parse(`${el}`);
            }
            catch (_a) {
                elType = el instanceof Object ? "object" : "string";
            }
            console.log(elType);
            if (elType !== this.uriParams[i].type) {
                throw new Error('Request param\'s type is wrong');
            }
            organizedDecodedURI[this.uriParams[i].name] = el;
        });
        return organizedDecodedURI;
    }
    /**
     * @returns If this.uriParams is undefined in constructor it returns array with path parts, and with object if it has ?= params, but if it is then it return object with named path parts and sub-object with params
     */
    Decode(uri) {
        console.log(uri);
        const decodedURI = this.getSplittedUri(uri).map(el => {
            // if there is no key value pair we return el
            if (!this.getQuantityOfKeyValuePairsInRowRequestParams(el)) {
                return el;
            }
            this.ValidateURIParams(el);
            return this.getKeyValuePairsAsObject(el.split('&'));
        });
        return this.organizeDecodedURI(decodedURI);
    }
}
exports.uriDecoder = uriDecoder;
