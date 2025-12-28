import { authResolver } from "./auth.resolver";
import { userResolver } from "./user.resolver";
import { postResolver } from "./post.resolver";
import { resetPasswordResolver } from "./resetPassword.resolver";

export const resolvers = {
  Query: {
    ...userResolver.Query,
    ...postResolver.Query,
  },
  Mutation: {
    ...resetPasswordResolver.Mutation,
    ...authResolver.Mutation,
  },
};
