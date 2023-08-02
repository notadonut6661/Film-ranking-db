"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UriDecoder = void 0;
var getNumberOfCharacterMentionInString_1 = require("@utils/getNumberOfCharacterMentionInString");
var dotenv_1 = require("dotenv");
require("dotenv/config");
/**
 *
 * @param uriParams is an array containing all the parts of uri (part is a term that defines string in uri splitted by "/" sign)
 */
(0, dotenv_1.config)();
var UriDecoder = /** @class */ (function () {
    function UriDecoder(_uriParams) {
        this.uriParams = _uriParams;
    }
    /**
   * @returns Splitted URI without first character slash
   */
    UriDecoder.prototype.getSplittedUri = function (uri) {
        return uri.replace(/^\//, '').split('/');
    };
    UriDecoder.prototype.getTypeOfElementInQuery = function (el) {
        var elType = typeof '';
        try {
            elType = typeof JSON.parse("".concat(el));
        }
        catch (_a) {
            elType = el instanceof Object ? "object" : "string";
        }
        return elType;
    };
    UriDecoder.prototype.getQuantityOfKeyValuePairsInRowRequestParams = function (rowRequestParams) {
        var _a;
        return (_a = Array.from(rowRequestParams.matchAll(/\?=/g)).length) !== null && _a !== void 0 ? _a : 0;
    };
    // FIXME Ich sicher nicht über zweite parameter
    UriDecoder.prototype.getKeyValuePairsAsObject = function (keyValuePairs, queryInSplittedPathId) {
        var _this = this;
        var result = {};
        var currentQueryElement = this.uriParams[queryInSplittedPathId].type;
        var queryRequiredLength = Object.keys(currentQueryElement).length;
        var minimalQueryLength = queryRequiredLength;
        keyValuePairs.forEach(function (pair, i) {
            var _a = pair.split('?='), key = _a[0], value = _a[1];
            var isElOptional;
            // !FIXME Will cause perfomance related issues
            if (typeof currentQueryElement !== 'object')
                return;
            if (keyValuePairs.length <= minimalQueryLength) {
                throw new Error("");
            }
            if (!Object.prototype.hasOwnProperty.call(currentQueryElement.Required, key) && !Object.prototype.hasOwnProperty.call(currentQueryElement.Optional, key)) {
                throw Error("I FUCKING HATE YOU");
            }
            else {
                isElOptional = Object.prototype.hasOwnProperty.call(currentQueryElement.Optional, key);
            }
            if (!(isElOptional && (currentQueryElement.Optional === undefined || currentQueryElement.Optional[key].type === _this.getTypeOfElementInQuery(value)))) {
                throw new Error("KURWA");
            }
            if (!isElOptional || currentQueryElement.Required[key] !== _this.getTypeOfElementInQuery(value)) {
                throw new Error("KURWA");
            }
            result[key] = value;
            minimalQueryLength = isElOptional ? minimalQueryLength + 1 : minimalQueryLength;
        });
        return result;
    };
    UriDecoder.prototype.ValidateURIParams = function (rowRequestParams) {
        var keyValuePairInElementQuantity = this.getQuantityOfKeyValuePairsInRowRequestParams(rowRequestParams);
        var totalQEMarksQuantity = ((0, getNumberOfCharacterMentionInString_1.getNumberOfCharacterMentionInString)(rowRequestParams, '?') + (0, getNumberOfCharacterMentionInString_1.getNumberOfCharacterMentionInString)(rowRequestParams, '='));
        if ((totalQEMarksQuantity / 2) !== keyValuePairInElementQuantity) {
            throw new Error('Not needed question or equal marks in request');
        }
    };
    UriDecoder.prototype.organizeDecodedURI = function (decodedURI) {
        var _this = this;
        var organizedDecodedURI = {};
        if (this.uriParams.length !== decodedURI.length) {
            throw new Error('Decoded URI length is different from expected');
        }
        decodedURI.forEach(function (el, i) {
            if (!_this.uriParams)
                return;
            var elType = _this.getTypeOfElementInQuery(el);
            if (elType !== _this.uriParams[i].type && elType !== "object") {
                throw new Error('Request param\'s type is wrong');
            }
            organizedDecodedURI[_this.uriParams[i].name] = el;
        });
        return organizedDecodedURI;
    };
    /**
     * @returns If this.uriParams is undefined in constructor it returns array with path parts, and with object if it has ?= params, but if it's then the method returns an object with named path parts and sub-object with params
     */
    UriDecoder.prototype.Decode = function (uri) {
        var _this = this;
        var decodedURI = this.getSplittedUri(uri).map(function (el, index) {
            if (!_this.getQuantityOfKeyValuePairsInRowRequestParams(el)) {
                return el;
            }
            _this.ValidateURIParams(el);
            return _this.getKeyValuePairsAsObject(el.split(process.env.QUERY_SEPARATOR), index);
        });
        return this.organizeDecodedURI(decodedURI);
    };
    return UriDecoder;
}());
exports.UriDecoder = UriDecoder;
