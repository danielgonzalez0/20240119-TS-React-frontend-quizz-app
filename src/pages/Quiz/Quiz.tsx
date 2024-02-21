import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_QUIZ } from '../../graphql/queries';
import { AnswerContainer, CustomLink, Title } from './style';
import Header from '../../components/header/Header';
import { Main } from '../../styles/globalSettings';
import MainButton from '../../components/buttons/mainButton/MainButton';
import Question from './question/Question';
import SelectionElement from '../../components/list/SelectionElement';

interface QuestionType {
  __typename: string;
  question: string;
  options: string[];
  answer: string;
}

const Quiz: React.FC = () => {
  //data fetching
  const { quizId } = useParams<{ quizId?: string }>();
  const { data, loading, error } = useQuery(GET_QUIZ, {
    variables: { id: quizId },
  });

  //states declaration
  const [currentQuestion, setCurrentQuestion] = React.useState<number | null>(
    null
  );
  const [questions, setQuestions] = React.useState<QuestionType[] | null>(null);
  const [options, setOptions] = React.useState<string[]>([]);
  // const [answer, setAnswer] = React.useState<string>("");
  // const [score, setScore] = React.useState<number>(0);
  // const [selectedOption, setSelectedOption] = React.useState<string>("");

  //functions
  const handleNextQuestion = async () => {
    await nextQuestion();
    await nextOptions();
  };

  const nextQuestion = async () => {
    setCurrentQuestion((prev: number | null) => {
      if (questions === null) return null;
      if (prev === null || prev === undefined) return null;
      if (prev < questions.length - 1) return prev + 1;
      return prev;
    });
  };

  const nextOptions = async () => {
    if (questions === null) return null;
    if (currentQuestion === null) return null;
    setOptions(questions[currentQuestion + 1].options);
  };

  //useEffect
  useEffect(() => {
    if (data) {
      setCurrentQuestion(0);
      setQuestions(data.quiz.questions);
      setOptions(data.quiz.questions[0].options);
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
          <Question
            question={questions[currentQuestion].question}
            length={questions.length}
            index={currentQuestion}
          />
          <AnswerContainer>
            <ul>
              {options.map((option, index) => (
                <SelectionElement
                  key={index}
                  option={option}
                  index={index}
                  onClick={() => console.log('clicked')}
                />
              ))}
            </ul>
            <MainButton onClick={handleNextQuestion}>Submit Answer</MainButton>
          </AnswerContainer>
        </Main>
      </>
    );
  }
};
export default Quiz;
