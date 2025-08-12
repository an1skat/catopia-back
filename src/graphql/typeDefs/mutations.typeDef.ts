export const mutationDefs = `
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
