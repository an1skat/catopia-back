"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
const typeDefs_types_1 = require("../shared/types/typeDefs.types");
exports.typeDefs = (0, graphql_tag_1.gql) `
  scalar Date
  ${typeDefs_types_1.catType}
  ${typeDefs_types_1.commentType}
  ${typeDefs_types_1.postType}
  ${typeDefs_types_1.userType}
  ${typeDefs_types_1.mutationDefs}
  ${typeDefs_types_1.queryDefs}
`;
