"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const User_1 = require("../../models/User");
exports.userResolver = {
    Query: {
        me: async (_, __, context) => {
            const user = await User_1.User.findById(context.userId);
            if (!user)
                throw new Error("Not authenticated");
            return user;
        },
    },
};
