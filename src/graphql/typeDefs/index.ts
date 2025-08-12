import { gql } from "graphql-tag";
import { catType } from "./cat.typeDef";
import { commentType } from "./comment.typeDef";
import { postType } from "./post.typeDef";
import { userType } from "./user.typeDef";
import { RegisterInput, LoginInput, AuthResponse } from "./auth.typeDef";
import { ResetInput, ResetResponse } from "./resetPassword.typeDef";
import { mutationDefs } from "./mutations.typeDef";
import { queryDefs } from "./queries.typeDef";

export const typeDefs = gql`
  scalar Date
  ${catType}
  ${commentType}
  ${postType}
  ${userType}
  ${RegisterInput}
  ${LoginInput}
  ${ResetInput}
  ${AuthResponse}
  ${ResetResponse}
  ${mutationDefs}
  ${queryDefs}
`;
