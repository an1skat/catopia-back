import { gql } from "graphql-tag";
import {
  userType,
  postType,
  catType,
  commentType,
  mutationDefs,
  queryDefs,
  RegisterInput,
} from "../shared/types/typeDefs.types";

export const typeDefs = gql`
  scalar Date
  ${catType}
  ${commentType}
  ${postType}
  ${userType}
  ${RegisterInput}
  ${mutationDefs}
  ${queryDefs}
`;
