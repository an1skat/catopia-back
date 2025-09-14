"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userType = void 0;
exports.userType = `
type User {
  _id: ID!
  name: String!
  email: String!
  password: String!
  isAdmin: Boolean!
  posts: [Post]!
  favorites: [Post]!
  followers: [User]!
  following: [User]!
}
`;
