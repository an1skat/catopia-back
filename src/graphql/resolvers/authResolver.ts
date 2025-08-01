import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/User";
import { RegisterArgs, LoginArgs } from "../../shared/types/auth.types";
import { configDotenv } from "dotenv";

configDotenv();

interface IAuthResolver {
  Mutation: {
    register: (_: any, args: RegisterArgs) => Promise<string>;
    login: (_: any, args: LoginArgs) => Promise<string>;
  };
}

export const authResolver: IAuthResolver = {
  Mutation: {
    register: async (_, args) => {
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
        posts: [],
        favorites: [],
        followers: [],
        following: [],
      });

      await user.save();
      return "Registration successful";
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !user.password) throw new Error("Invalid credentials");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      return token;
    },
  },
};
