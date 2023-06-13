"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uriDecoder = void 0;
const getNumberOfCharacterMentionInString_1 = require("../utils/getNumberOfCharacterMentionInString");
const dotenv_1 = require("dotenv");
require("dotenv/config");
/**
 *
 * @param uriParams is an array containing all the parts of uri (part is a term that defines string in uri splitted by "/" sign)
 */
(0, dotenv_1.config)();
class uriDecoder {
    constructor(_uriParams) {
        this.uriParams = _uriParams;
    }
    /**
   * @returns Splitted URI without first character slash
   */
    getSplittedUri(uri) {
        return uri.replace(/^\//, '').split('/');
    }
    getQuantityOfKeyValuePairsInRowRequestParams(rowRequestParams) {
        var _a;
        return (_a = Array.from(rowRequestParams.matchAll(/\?=/g)).length) !== null && _a !== void 0 ? _a : 0;
    }
    getKeyValuePairsAsObject(keyValuePairs, queryInSplittedPathId) {
        const result = {};
        if (keyValuePairs.length !== this.uriParams[queryInSplittedPathId].type.length) {
            throw Error('Length of provided query differs from required');
        }
        keyValuePairs.forEach((pair, i) => {
            const [key, value] = pair.split('?=');
            const currentQueryElement = this.uriParams[queryInSplittedPathId].type[i];
            if (typeof currentQueryElement !== 'object')
                return;
            if (typeof this.uriParams[queryInSplittedPathId].type[i] === 'object' && typeof this.uriParams[queryInSplittedPathId].type[i] !== 'string') {
                if (currentQueryElement.name !== key || currentQueryElement.type !== typeof JSON.parse(value)) {
                    console.log(this.uriParams[queryInSplittedPathId].type[i], typeof value);
                }
            }
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
        if (this.uriParams.length !== decodedURI.length) {
            throw new Error('Decoded URI length is different from expected');
        }
        decodedURI.forEach((el, i) => {
            if (!this.uriParams)
                return;
            let elType = typeof '';
            try {
                elType = typeof JSON.parse(`${el}`);
            }
            catch (_a) {
                elType = el instanceof Object ? "object" : "string";
            }
            if (elType !== this.uriParams[i].type && elType !== "object") {
                throw new Error('Request param\'s type is wrong');
            }
            organizedDecodedURI[this.uriParams[i].name] = el;
        });
        return organizedDecodedURI;
    }
    /**
     * @returns If this.uriParams is undefined in constructor it returns array with path parts, and with object if it has ?= params, but if it's then the method returns an object with named path parts and sub-object with params
     */
    Decode(uri) {
        const decodedURI = this.getSplittedUri(uri).map((el, index) => {
            if (!this.getQuantityOfKeyValuePairsInRowRequestParams(el)) {
                return el;
            }
            this.ValidateURIParams(el);
            // FIXME Magic char
            return this.getKeyValuePairsAsObject(el.split(process.env.QUERY_SEPARATOR), index);
        });
        return this.organizeDecodedURI(decodedURI);
    }
}
exports.uriDecoder = uriDecoder;
