import { Post } from "../../models/Post";
import { Comment } from "../../models/Comment";
import { User } from "../../models/User";
import { IResolvers } from "@graphql-tools/utils";

export const postResolver: IResolvers = {
  Query: {
    getAllPosts: async () => {
      return await Post.find()
        .populate({
          path: "comments",
          populate: { path: "author", model: User },
        })
        .exec();
    },

    getPostById: async (_: any, { _id }: { _id: string }) => {
      return await Post.findById(_id)
        .populate({
          path: "comments",
          populate: { path: "author", model: User },
        })
        .exec();
    },
  },

  Post: {
    comments: async (parent: any) => {
      return await Comment.find({
        _id: { $in: parent.comments },
      }).populate("author");
    },
  },
};
