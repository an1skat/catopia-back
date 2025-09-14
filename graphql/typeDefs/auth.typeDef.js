"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponse = exports.LoginInput = exports.RegisterInput = void 0;
exports.RegisterInput = `
input RegisterInput {
  name: String!
  email: String!
  password: String!
}
`;
exports.LoginInput = `
input LoginInput {
  email: String!
  password: String!
}
`;
exports.AuthResponse = `
type AuthResponse {
  accessToken: String!
  user: User!
}
`;
