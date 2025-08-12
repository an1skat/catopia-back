import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { User } from "../../models/User";
import { Session } from "../../models/Session";
import { RegisterArgs, LoginArgs } from "../../shared/types/auth.types";
import { configDotenv } from "dotenv";
import { IResolvers } from "@graphql-tools/utils";

configDotenv();

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

const createTokens = (userId: string, sessionId: string) => {
  if (!ACCESS_SECRET || !REFRESH_SECRET)
    throw new Error("Secret key dont have a value");
  const accessToken = jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ sessionId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

export const authResolver: IResolvers = {
  Mutation: {
    register: async (_: any, args: RegisterArgs, { res }: any) => {
      try {
        const { name, email, password } = args.input;
        if (!email || !password)
          throw new Error("Email and password are required");

        const existing = await User.findOne({ email });
        if (existing) throw new Error("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name,
          email,
          password: hashedPassword,
          isAdmin: false,
        });
        await user.save();

        const sessionId = uuid();
        const { accessToken, refreshToken } = createTokens(
          String(user._id),
          sessionId
        );

        await Session.create({ sessionId, userId: user._id, refreshToken });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        if (!accessToken) throw new Error("Access token wasnt create");

        return "Registration done succesfully";
      } catch (error) {
        console.error(error);
        throw new Error("Registration failed");
      }
    },

    login: async (_: any, args: LoginArgs, { res }: any) => {
      const { email, password } = args.input;
      const user = await User.findOne({ email });
      if (!user || !user.password) throw new Error("Invalid credentials");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const sessionId = uuid();
      const { accessToken, refreshToken } = createTokens(
        String(user._id),
        sessionId
      );

      await Session.create({ sessionId, userId: user._id, refreshToken });

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

    refresh: async (_: any, __: any, { req, res }: any) => {
      const token = req.cookies.refreshToken;
      if (!token) throw new Error("No refresh token");

      let payload: any;
      try {
        payload = jwt.verify(token, REFRESH_SECRET);
      } catch {
        throw new Error("Invalid or expired refresh token");
      }

      const session = await Session.findOne({ sessionId: payload.sessionId });
      if (!session || session.refreshToken !== token) {
        throw new Error("Invalid session or token mismatch");
      }

      const { accessToken, refreshToken: newRefresh } = createTokens(
        session.userId,
        session.sessionId
      );
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

    logout: async (_: any, __: any, { req, res }: any) => {
      const token = req.cookies.refreshToken;
      if (!token) {
        res.clearCookie("refreshToken");
        return true;
      }

      try {
        const payload: any = jwt.verify(token, REFRESH_SECRET);
        await Session.deleteOne({ sessionId: payload.sessionId });
      } catch {}

      res.clearCookie("refreshToken");
      return true;
    },
  },
};
