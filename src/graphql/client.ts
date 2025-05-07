import {ApolloClient, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://simple-graphql.fly.dev/',
  cache: new InMemoryCache(),
});