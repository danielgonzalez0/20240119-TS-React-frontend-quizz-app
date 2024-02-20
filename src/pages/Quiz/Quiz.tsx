import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_QUIZ } from '../../graphql/queries';
import { CustomLink, Title } from './style';
import Header from '../../components/header/Header';

const Quiz: React.FC = () => {
  //variables
  const { quizId } = useParams<{ quizId?: string }>();

  //data fetching
  const { data, loading, error } = useQuery(GET_QUIZ, {
    variables: { id: quizId },
  });

  //rendering
  if (loading) return <Title>Loading...</Title>;

  if (error) return <Title>Error! ${error.message}</Title>;

  if (!data.quiz)
    return (
      <Title>
        Erreur 404: this page does not exist.
        <CustomLink to="/">Return to the home page</CustomLink>
      </Title>
    );

  return (
    <>
      <Header
        title={data.quiz.title}
        icon={data.quiz.icon}
        color={data.quiz.color}
      />
      <div>page for quiz number {data.quiz.title}</div>
    </>
  );
};

export default Quiz;
