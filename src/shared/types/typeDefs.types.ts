export const catType = `
type Cat {
    _id: ID!
    name: String!
  image: String!
  length: String!
  years: String!
  weight: String!
  cost: String!
  rate: String!
  description: String!
  character: String!
  diet: String!
  health: String!
  care: String!
  url: String!
}
`;

export const commentType = `
type Comment {
    _id: ID!
    author: User!
    text: String!
    likes: Int!
    reports: Int!
}
`;

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

export const mutationDefs = `
type Mutation {
    register(
        name: String!
        email: String!
        password: String!
    ): String!

    login(email: String!, password: String!): String!
}
`;

export const queryDefs = `
type Query {
    getAllPosts: [Post!]!
    getPostById(_id: ID!): Post!
    me: User!
    getAllCats: [Cat!]!
    getCatById(_id: ID!): Cat!
}
`;
