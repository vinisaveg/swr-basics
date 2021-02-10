import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  "https://api.spacex.land/graphql/"
);
