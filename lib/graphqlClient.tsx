import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  "https://enatega-multivendor.up.railway.app/graphql"
);

export default client;
