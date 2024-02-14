import {ApolloClient, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://backend-app-quizz-5908c890fdf5.herokuapp.com/',
  cache: new InMemoryCache()
});