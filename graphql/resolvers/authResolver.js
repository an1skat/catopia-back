"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolver = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../models/User");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
exports.authResolver = {
    Mutation: {
        register: async (_, args) => {
            const { name, email, password } = args;
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
                posts: [],
                favorites: [],
                followers: [],
                following: [],
            });
            await user.save();
            return "Registration successful";
        },
        login: async (_, { email, password }) => {
            const user = await User_1.User.findOne({ email });
            if (!user || !user.password)
                throw new Error("Invalid credentials");
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error("Invalid credentials");
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            return token;
        },
    },
};
