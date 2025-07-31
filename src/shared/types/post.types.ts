import { Schema } from "mongoose";
import { IComment } from "./comment.types";

export interface IPost {
  author: Schema.Types.ObjectId;
  text: string;
  likes: number[];
  tags: string[];
  comments: IComment[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
