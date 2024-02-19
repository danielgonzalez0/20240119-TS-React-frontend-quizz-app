import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_QUIZ } from '../../graphql/queries';
import { CustomLink, Title } from './style';

const Quiz: React.FC = () => {
  const { quizId } = useParams<{ quizId?: string }>();
  const { data, loading, error } = useQuery(GET_QUIZ, {
    variables: { id: quizId },
  });

  if (loading) return <Title>Loading...</Title>;

  if (error) return <Title>Error! ${error.message}</Title>;

  if (!data.quiz)
    return (
      <Title>
        Erreur 404: Cette page n'existe pas
        <CustomLink to="/">Retourner à la page d'accueil</CustomLink>
      </Title>
    );

  return <div>page for quiz number {data.quiz.title}</div>;
};

export default Quiz;
