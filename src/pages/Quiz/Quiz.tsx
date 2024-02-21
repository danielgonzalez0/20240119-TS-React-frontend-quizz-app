import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_QUIZ } from '../../graphql/queries';
import { CustomLink, Title } from './style';
import Header from '../../components/header/Header';
import { Main } from '../../styles/globalSettings';
import MainButton from '../../components/buttons/mainButton/MainButton';
import Question from './question/Question';

interface QuestionType {
  __typename: string;
  question: string;
  options: string[];
  answer: string;
}

const Quiz: React.FC = () => {
  //variables
  const { quizId } = useParams<{ quizId?: string }>();
  const [currentQuestion, setCurrentQuestion] = React.useState<number | null>(
    null
  );
  const [questions, setQuestions] = React.useState<QuestionType[] | null>(null);

  const handleNextQuestion = () => {

    setCurrentQuestion((prev: number | null) => {
      if (questions === null) return null;
      if (prev === null || prev === undefined) return null;
      if (prev < questions.length - 1) return prev + 1;
      return prev;
    });
  };

  //data fetching
  const { data, loading, error } = useQuery(GET_QUIZ, {
    variables: { id: quizId },
  });

  useEffect(() => {
    if (data) {
      setCurrentQuestion(0);
      setQuestions(data.quiz.questions);
    }
  }, [data]);

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
  if (data && questions && questions.length > 0 && currentQuestion !== null) {
    return (
      <>
        <Header
          title={data.quiz.title}
          icon={data.quiz.icon}
          color={data.quiz.color}
        />
        <Main>
          {}
          <Question
            question={questions[currentQuestion].question}
            length={questions.length}
            index={currentQuestion}
          />
          <MainButton onClick={handleNextQuestion}>Submit Answer</MainButton>
        </Main>
      </>
    );
  }
};
export default Quiz;
