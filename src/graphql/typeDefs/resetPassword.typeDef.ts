export const ResetInput = `
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

export const ResetResponse = `
type ResetResponse {
  success: Boolean!
  message: String
}
`;

export const ResetType = `
type ResetResult {
  success: Boolean!
  message: String!
}
`;
