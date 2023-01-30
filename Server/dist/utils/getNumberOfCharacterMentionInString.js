"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberOfCharacterMentionInString = void 0;
function getNumberOfCharacterMentionInString(str, character) {
    return str.split('').filter((el) => el === character).length;
}
exports.getNumberOfCharacterMentionInString = getNumberOfCharacterMentionInString;
