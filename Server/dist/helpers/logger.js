"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var ts_enum_util_1 = require("ts-enum-util");
var LogConfigOptions;
(function (LogConfigOptions) {
    LogConfigOptions["date"] = "date";
    LogConfigOptions["status"] = "status";
})(LogConfigOptions || (LogConfigOptions = {}));
var LogConfigOptionsList = (0, ts_enum_util_1.$enum)(LogConfigOptions).getKeys();
var Logger = (function () {
    function Logger(_logFormat) {
        this.LogFormat = _logFormat;
    }
    Logger.prototype.EncodeLogFormatString = function (LogFormat) {
        var result = [];
        for (var i = 0; i < LogFormat.split(' ').length; i++) {
            var currentOption = LogFormat.split(' ')[i];
            if (!LogConfigOptionsList.includes(currentOption))
                continue;
            result.push(currentOption);
        }
        return result;
    };
    Logger.prototype.PrintToFileByFormat = function (m_Format, m_Path, m_Data) {
        console.log(m_Format);
    };
    Logger.prototype.CreateLogDecorator = function (m_Purpose) {
        return function (target, propertyKey, descriptor) {
        };
    };
    return Logger;
}());
exports.Logger = Logger;
