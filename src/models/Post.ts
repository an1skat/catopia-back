import mongoose, { Schema } from "mongoose";
import { IPost } from "../shared/types/post.types";

interface IPostDocument extends IPost, mongoose.Document {}

const PostSchema = new Schema<IPostDocument>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    tags: [{ type: String, default: [] }],
    comments: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    images: [{ type: String, default: [] }],
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPostDocument>("Post", PostSchema);
