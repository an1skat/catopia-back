import { authResolver } from "./authResolver";
import { userResolver } from "./userResolver";
import { postResolver } from "./postResolver";

export const resolvers = {
  Query: {
    ...userResolver.Query,
    ...postResolver.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
  },
};
