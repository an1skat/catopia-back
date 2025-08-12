export const queryDefs = `
type Query {
  getAllPosts: [Post!]!
  getPostById(_id: ID!): Post!
  me: User!
  getAllCats: [Cat!]!
  getCatById(_id: ID!): Cat!
}
`;
