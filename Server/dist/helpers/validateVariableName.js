"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVariableName = void 0;
function validateVariableName(name) {
    return !name.match(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/);
}
exports.validateVariableName = validateVariableName;
