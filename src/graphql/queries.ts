import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      username
      age
    }
  }
`;
