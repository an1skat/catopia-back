import mongoose, { Schema } from "mongoose";
import { IUser } from "../shared/types/user.types";

interface IUserDocument extends IUser, mongoose.Document {}

const UserSchema = new Schema<IUserDocument>({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: Boolean,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post", default: 0 }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Post", default: 0 }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User", default: 0 }],
  following: [{ type: Schema.Types.ObjectId, ref: "User", default: 0 }],
});

export const User = mongoose.model<IUserDocument>("User", UserSchema);
