// lib/graphqlClient.ts

import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  "https://enatega-multivendor.up.railway.app/graphql",
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

export default client;
