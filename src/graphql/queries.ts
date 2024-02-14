import { gql } from '@apollo/client';

export const GET_QUIZZES = gql`
  query getQuizzes {
    quizzes {
      id
      title
      icon
    }
  }
`;
