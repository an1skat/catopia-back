"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.resetPasswordLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000, // 10 минут
    max: 5, // максимум 5 запросов на IP за 10 минут
    message: "Too many password reset attempts, please try again later.",
});
