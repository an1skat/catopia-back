import { IResolvers } from "@graphql-tools/utils";
import { User } from "../../models/User";

export const userResolver: IResolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      const user = await User.findById(context.userId);
      if (!user) throw new Error("Not authenticated");
      return user;
    },
  },
};
