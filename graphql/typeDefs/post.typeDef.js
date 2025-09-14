"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postType = void 0;
exports.postType = `
type Post {
  _id: ID!
  text: String!
  tags: [String!]!
  comments: [Comment!]!
  images: [String!]!
  createdAt: Date!
  updatedAt: Date!
}
`;
