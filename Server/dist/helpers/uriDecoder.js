"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UriDecoder = void 0;
var getNumberOfCharacterMentionInString_1 = require("../utils/getNumberOfCharacterMentionInString");
var dotenv_1 = require("dotenv");
require("dotenv/config");
(0, dotenv_1.config)();
var UriDecoder = (function () {
    function UriDecoder(_uriParams) {
        this.uriParams = _uriParams;
    }
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
    UriDecoder.prototype.getKeyValuePairsAsObject = function (keyValuePairs, queryInSplittedPathId) {
        var _this = this;
        var result = {};
        var currentQueryElement = this.uriParams[queryInSplittedPathId].type;
        if (typeof currentQueryElement !== 'object')
            throw new Error('');
        var queryRequiredLength = Object.keys(currentQueryElement.Required).length;
        var minimalQueryLength = queryRequiredLength;
        keyValuePairs.forEach(function (pair, i) {
            var _a;
            var _b = pair.split('?='), key = _b[0], value = _b[1];
            var isElOptional;
            console.log(keyValuePairs, Object.keys(currentQueryElement));
            if (keyValuePairs.length < minimalQueryLength) {
                throw new Error("Too few parameters");
            }
            if (!Object.prototype.hasOwnProperty.call(currentQueryElement.Required, key) && !Object.prototype.hasOwnProperty.call((currentQueryElement === null || currentQueryElement === void 0 ? void 0 : currentQueryElement.Optional) || {}, key)) {
                throw Error("I FUCKING HATE YOU");
            }
            else {
                isElOptional = Object.prototype.hasOwnProperty.call((_a = currentQueryElement.Optional) !== null && _a !== void 0 ? _a : {}, key);
            }
            if (isElOptional && (currentQueryElement.Optional === undefined || currentQueryElement.Optional[key].type === _this.getTypeOfElementInQuery(value))) {
                throw new Error("KURWA");
            }
            if (currentQueryElement.Required[key] !== _this.getTypeOfElementInQuery(value)) {
                throw new Error("KURWA 123");
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
