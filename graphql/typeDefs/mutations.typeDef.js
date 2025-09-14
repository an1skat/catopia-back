"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutationDefs = void 0;
exports.mutationDefs = `
type Mutation {
  register(input: RegisterInput!): String!
  login(input: LoginInput!): AuthResponse!
  refresh: String!
  logout: Boolean!
  requestPasswordReset(input: ResetEmailInput!): ResetResponse!
  verifyCodeReset(input: VerifyCodeInput!): ResetResponse!
  setNewPassword(input: SetPasswordInput!): ResetResponse!
}
`;
