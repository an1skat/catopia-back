"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const authMiddleware = (req, _, next) => {
    const auth = req.headers.authorization;
    if (auth?.startsWith("Bearer ")) {
        try {
            const token = auth.split(" ")[1];
            const payload = jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
            req.userId = payload.userId;
        }
        catch { }
    }
    next();
};
exports.authMiddleware = authMiddleware;
