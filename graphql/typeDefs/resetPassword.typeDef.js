"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetType = exports.ResetResponse = exports.ResetInput = void 0;
exports.ResetInput = `
input ResetEmailInput {
  email: String!
}

input VerifyCodeInput {
  code: String!
}

input SetPasswordInput {
  newPassword: String!
}
`;
exports.ResetResponse = `
type ResetResponse {
  success: Boolean!
  message: String
}
`;
exports.ResetType = `
type ResetResult {
  success: Boolean!
  message: String!
}
`;
