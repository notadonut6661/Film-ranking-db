"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSha256 = void 0;
const crypto_1 = require("crypto");
function generateSha256(str) {
    return (0, crypto_1.createHash)('sha256').update(str).digest('hex');
}
exports.generateSha256 = generateSha256;
