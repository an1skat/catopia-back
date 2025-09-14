"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const auth_resolver_1 = require("./auth.resolver");
const user_resolver_1 = require("./user.resolver");
const post_resolver_1 = require("./post.resolver");
const resetPassword_resolver_1 = require("./resetPassword.resolver");
// import type { IResolvers } from "@graphql-tools/utils";
exports.resolvers = {
    Query: {
        ...user_resolver_1.userResolver.Query,
        ...post_resolver_1.postResolver.Query,
    },
    Mutation: {
        ...resetPassword_resolver_1.resetPasswordResolver.Mutation,
        ...auth_resolver_1.authResolver.Mutation,
    },
};
