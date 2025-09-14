"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareResetCode = exports.verifyResetToken = exports.signResetToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
const JWT_SECRET = process.env.JWT_SECRET;
const signResetToken = (email, code) => {
    return jsonwebtoken_1.default.sign({ email, code }, JWT_SECRET, { expiresIn: "10m" });
};
exports.signResetToken = signResetToken;
const verifyResetToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch {
        return null;
    }
};
exports.verifyResetToken = verifyResetToken;
const compareResetCode = (token, inputCode) => {
    const decoded = (0, exports.verifyResetToken)(token);
    if (!decoded)
        return false;
    return decoded.code === inputCode;
};
exports.compareResetCode = compareResetCode;
