"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
const cat_typeDef_1 = require("./cat.typeDef");
const comment_typeDef_1 = require("./comment.typeDef");
const post_typeDef_1 = require("./post.typeDef");
const user_typeDef_1 = require("./user.typeDef");
const auth_typeDef_1 = require("./auth.typeDef");
const resetPassword_typeDef_1 = require("./resetPassword.typeDef");
const mutations_typeDef_1 = require("./mutations.typeDef");
const queries_typeDef_1 = require("./queries.typeDef");
exports.typeDefs = (0, graphql_tag_1.gql) `
  scalar Date
  ${cat_typeDef_1.catType}
  ${comment_typeDef_1.commentType}
  ${post_typeDef_1.postType}
  ${user_typeDef_1.userType}
  ${auth_typeDef_1.RegisterInput}
  ${auth_typeDef_1.LoginInput}
  ${resetPassword_typeDef_1.ResetInput}
  ${auth_typeDef_1.AuthResponse}
  ${resetPassword_typeDef_1.ResetResponse}
  ${mutations_typeDef_1.mutationDefs}
  ${queries_typeDef_1.queryDefs}
`;
