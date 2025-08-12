export const postType = `
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
