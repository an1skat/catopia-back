import { Schema } from "mongoose";

export interface IComment {
  author: Schema.Types.ObjectId;
  text: string;
  likes: number;
  reports: number;
}
