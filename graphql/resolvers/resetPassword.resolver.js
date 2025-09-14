"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordResolver = void 0;
const sendEmail_1 = require("../../utils/sendEmail");
const jwt_1 = require("../../utils/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../../models/User");
exports.resetPasswordResolver = {
    Mutation: {
        async requestPasswordReset(_, { input }, { res }) {
            const user = await User_1.User.findOne({ email: input.email });
            if (!user) {
                throw new Error("If the email exists, a code has been sent");
            }
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            await (0, sendEmail_1.sendResetCodeEmail)(input.email, code);
            const token = (0, jwt_1.signResetToken)(input.email, code);
            res.cookie("resetToken", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
                maxAge: 1000 * 60 * 15,
                path: "/",
            });
            return { success: true, message: "Reset code sent" };
        },
        async verifyCodeReset(_, { input }, { req }) {
            console.log(req);
            const token = req.cookies.resetToken;
            if (!token) {
                throw new Error("Reset token missing");
            }
            const isValid = (0, jwt_1.compareResetCode)(token, input.code);
            if (!isValid) {
                throw new Error("Invalid or expired code");
            }
            const payload = (0, jwt_1.verifyResetToken)(token);
            if (!payload) {
                throw new Error("Invalid or expired token");
            }
            return { success: true, message: "Code is valid" };
        },
        async setNewPassword(_, { input }, { req, res }) {
            const token = req.cookies.resetToken;
            if (!token) {
                throw new Error("Reset token missing");
            }
            const payload = (0, jwt_1.verifyResetToken)(token);
            if (!payload) {
                throw new Error("Invalid or expired token");
            }
            const user = await User_1.User.findOne({ email: payload.email });
            if (!user) {
                throw new Error("User not found");
            }
            const hashed = await bcrypt_1.default.hash(input.newPassword, 10);
            user.password = hashed;
            await user.save();
            res.clearCookie("resetToken", { path: "/" });
            return { success: true, message: "Password reset successful" };
        },
    },
};
