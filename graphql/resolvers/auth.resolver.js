"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolver = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const User_1 = require("../../models/User");
const Session_1 = require("../../models/Session");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const createTokens = (userId, sessionId) => {
    if (!ACCESS_SECRET || !REFRESH_SECRET)
        throw new Error("Secret key dont have a value");
    const accessToken = jsonwebtoken_1.default.sign({ userId }, ACCESS_SECRET, { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({ sessionId }, REFRESH_SECRET, {
        expiresIn: "7d",
    });
    return { accessToken, refreshToken };
};
exports.authResolver = {
    Mutation: {
        register: async (_, args, { res }) => {
            try {
                const { name, email, password } = args.input;
                if (!email || !password)
                    throw new Error("Email and password are required");
                const existing = await User_1.User.findOne({ email });
                if (existing)
                    throw new Error("User already exists");
                const hashedPassword = await bcryptjs_1.default.hash(password, 10);
                const user = new User_1.User({
                    name,
                    email,
                    password: hashedPassword,
                    isAdmin: false,
                });
                await user.save();
                const sessionId = (0, uuid_1.v4)();
                const { accessToken, refreshToken } = createTokens(String(user._id), sessionId);
                await Session_1.Session.create({ sessionId, userId: user._id, refreshToken });
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                if (!accessToken)
                    throw new Error("Access token wasnt create");
                return "Registration done succesfully";
            }
            catch (error) {
                console.error(error);
                throw new Error("Registration failed");
            }
        },
        login: async (_, args, { res }) => {
            const { email, password } = args.input;
            const user = await User_1.User.findOne({ email });
            if (!user || !user.password)
                throw new Error("Invalid credentials");
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error("Invalid credentials");
            const sessionId = (0, uuid_1.v4)();
            const { accessToken, refreshToken } = createTokens(String(user._id), sessionId);
            await Session_1.Session.create({ sessionId, userId: user._id, refreshToken });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return {
                accessToken,
                user: {
                    _id: user._id,
                    isAdmin: user.isAdmin,
                },
            };
        },
        refresh: async (_, __, { req, res }) => {
            const token = req.cookies.refreshToken;
            if (!token)
                throw new Error("No refresh token");
            let payload;
            try {
                payload = jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
            }
            catch {
                throw new Error("Invalid or expired refresh token");
            }
            const session = await Session_1.Session.findOne({ sessionId: payload.sessionId });
            if (!session || session.refreshToken !== token) {
                throw new Error("Invalid session or token mismatch");
            }
            const { accessToken, refreshToken: newRefresh } = createTokens(session.userId, session.sessionId);
            session.refreshToken = newRefresh;
            await session.save();
            res.cookie("refreshToken", newRefresh, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return accessToken;
        },
        logout: async (_, __, { req, res }) => {
            const token = req.cookies.refreshToken;
            if (!token) {
                res.clearCookie("refreshToken");
                return true;
            }
            try {
                const payload = jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
                await Session_1.Session.deleteOne({ sessionId: payload.sessionId });
            }
            catch { }
            res.clearCookie("refreshToken");
            return true;
        },
    },
};
