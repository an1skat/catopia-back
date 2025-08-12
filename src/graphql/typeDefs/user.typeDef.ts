export const userType = `
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
