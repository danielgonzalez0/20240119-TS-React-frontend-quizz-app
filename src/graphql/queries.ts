import { gql } from '@apollo/client';

export const GET_QUIZZES = gql`
  query getQuizzes {
    quizzes {
      id
      title
      icon
      color
    }
  }
`;

export const GET_QUIZ = gql`
  query getQuiz($id: ID!) {
    quiz(id: $id) {
      id
      title
      icon
      color
      questions {
        question
        options
      answer}
    }
  }
`;
