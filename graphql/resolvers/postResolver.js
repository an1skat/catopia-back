"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolver = void 0;
const Post_1 = require("../../models/Post");
const Comment_1 = require("../../models/Comment");
const User_1 = require("../../models/User");
exports.postResolver = {
    Query: {
        getAllPosts: async () => {
            return await Post_1.Post.find()
                .populate({
                path: "comments",
                populate: { path: "author", model: User_1.User },
            })
                .exec();
        },
        getPostById: async (_, { _id }) => {
            return await Post_1.Post.findById(_id)
                .populate({
                path: "comments",
                populate: { path: "author", model: User_1.User },
            })
                .exec();
        },
    },
    Post: {
        comments: async (parent) => {
            return await Comment_1.Comment.find({
                _id: { $in: parent.comments },
            }).populate("author");
        },
    },
};
