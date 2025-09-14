"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryDefs = void 0;
exports.queryDefs = `
type Query {
  getAllPosts: [Post!]!
  getPostById(_id: ID!): Post!
  me: User!
  getAllCats: [Cat!]!
  getCatById(_id: ID!): Cat!
}
`;
