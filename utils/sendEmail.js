"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetCodeEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
const sendResetCodeEmail = async (to, code) => {
    const mailOptions = {
        from: "Catopia Support",
        to,
        subject: "Password Reset Code",
        text: `Your password reset code is: ${code}`,
    };
    await transporter.sendMail(mailOptions);
};
exports.sendResetCodeEmail = sendResetCodeEmail;
