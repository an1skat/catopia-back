import mongoose, { Schema } from "mongoose";
import { IComment } from "../shared/types/comment.types";

interface ICommentDocument extends IComment, mongoose.Document {}

const CommentSchema = new Schema<ICommentDocument>({
  author: Schema.Types.ObjectId,
  text: String,
  likes: {
    type: Number,
    default: 0,
  },
  reports: {
    type: Number,
    default: 0,
  },
});

export const Comment = mongoose.model("Comment", CommentSchema);
