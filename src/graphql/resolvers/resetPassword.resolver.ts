import { IResolvers } from "@graphql-tools/utils";
import { sendResetCodeEmail } from "../../utils/sendEmail";
import {
  signResetToken,
  compareResetCode,
  verifyResetToken,
} from "../../utils/jwt";
import bcrypt from "bcrypt";
import { User } from "../../models/User";

export const resetPasswordResolver: IResolvers = {
  Mutation: {
    async requestPasswordReset(
      _: any,
      { input }: { input: { email: string } },
      { res },
    ) {
      const user = await User.findOne({ email: input.email });
      if (!user) {
        throw new Error("If the email exists, a code has been sent");
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      await sendResetCodeEmail(input.email, code);

      const token = signResetToken(input.email, code);

      res.cookie("resetToken", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 15,
        path: "/",
      });

      return { success: true, message: "Reset code sent" };
    },

    async verifyCodeReset(
      _: any,
      { input }: { input: { code: string } },
      { req },
    ) {
      console.log(req);
      const token = req.cookies.resetToken;
      if (!token) {
        throw new Error("Reset token missing");
      }

      const isValid = compareResetCode(token, input.code);

      if (!isValid) {
        throw new Error("Invalid or expired code");
      }

      const payload = verifyResetToken(token);
      if (!payload) {
        throw new Error("Invalid or expired token");
      }

      return { success: true, message: "Code is valid" };
    },

    async setNewPassword(
      _: any,
      { input }: { input: { newPassword: string } },
      { req, res },
    ) {
      const token = req.cookies.resetToken;
      if (!token) {
        throw new Error("Reset token missing");
      }

      const payload = verifyResetToken(token);
      if (!payload) {
        throw new Error("Invalid or expired token");
      }

      const user = await User.findOne({ email: payload.email });
      if (!user) {
        throw new Error("User not found");
      }

      const hashed = await bcrypt.hash(input.newPassword, 10);
      user.password = hashed;
      await user.save();

      res.clearCookie("resetToken", { path: "/" });

      return { success: true, message: "Password reset successful" };
    },
  },
};
