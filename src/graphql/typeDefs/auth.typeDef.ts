export const RegisterInput = `
input RegisterInput {
  name: String!
  email: String!
  password: String!
}
`;

export const LoginInput = `
input LoginInput {
  email: String!
  password: String!
}
`;

export const AuthResponse = `
type AuthResponse {
  accessToken: String!
  user: User!
}
`;
