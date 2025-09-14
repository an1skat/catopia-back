"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentType = void 0;
exports.commentType = `
type Comment {
  _id: ID!
  author: User!
  text: String!
  likes: Int!
  reports: Int!
}
`;
