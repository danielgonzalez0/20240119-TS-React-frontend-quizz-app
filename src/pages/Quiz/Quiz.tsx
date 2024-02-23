import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_QUIZ } from '../../graphql/queries';
import { AnswerContainer, CustomLink, ErrorMessage, Title } from './style';
import Header from '../../components/header/Header';
import { Main } from '../../styles/globalSettings';
import MainButton from '../../components/buttons/mainButton/MainButton';
import Question from './question/Question';
import SelectionElement from '../../components/list/SelectionElement';
import errorIcon from '../../assets/images/icon-error.svg';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { RootState } from '../../redux/store';

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
  const darkMode = useAppSelector((state: RootState) => state.darkMode);
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>('');
  // const [score, setScore] = React.useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  //functions
  const handleNextQuestion = async () => {
    await nextQuestion();
    await nextOptions();
    await getAnswer();
    setIsAnswered(false);
    setSelectedOption('');
  };

  const nextQuestion = async () => {
    setCurrentQuestion((prev: number | null) => {
      if (questions === null) return null;
      if (prev === null || prev === undefined) return null;
      if (prev < questions.length - 1) {
        const next = prev + 1;
        return next;
      }
      return prev;
    });
  };

  const nextOptions = async () => {
    if (questions === null) return null;
    if (currentQuestion === null) return null;
    setOptions(questions[currentQuestion + 1].options);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswered && selectedOption) return;
    setSelectedOption(option);
  };

  const getAnswer = async () => {
    if (questions === null) return null;
    if (currentQuestion === null) return null;
    const answer = questions[currentQuestion + 1].answer;
    setAnswer(answer);
  };

  const handleSubmitAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAnswered(true);

    if (!selectedOption) return;

    // const answerToCheck = selectedOption;
  };

  const handleClassName = (option: string) => {
    if (isAnswered === false) return option === selectedOption ? 'active' : '';
    if (isAnswered && option === selectedOption && selectedOption === answer)
      return 'correctAnswer';
    if (isAnswered && option === selectedOption && selectedOption !== answer)
      return 'wrongAnswer';
    if (isAnswered && option === answer && selectedOption) return 'correct';
    return '';
  };

  //useEffect
  useEffect(() => {
    if (data && data.quiz) {
      setCurrentQuestion(0);
      setQuestions(data.quiz.questions);
      setOptions(data.quiz.questions[0].options);
      setAnswer(data.quiz.questions[0].answer);
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
                  onClick={() => handleOptionClick(option)}
                  onKeyDown={(e?: React.KeyboardEvent<HTMLLIElement>) => {
                    if (e && e.key === 'Enter') handleOptionClick(option);
                  }}
                  className={handleClassName(option)}
                />
              ))}
            </ul>
            {isAnswered && selectedOption && (
              <MainButton onClick={handleNextQuestion}>
                Next Question
              </MainButton>
            )}

            {(!isAnswered || (isAnswered && selectedOption === '')) && (
              <MainButton onClick={(e) => handleSubmitAnswer(e)}>
                Submit Answer
              </MainButton>
            )}
            {isAnswered && selectedOption === '' && (
              <ErrorMessage $darkMode={darkMode}>
                <img src={errorIcon} alt="error icon" />
                <span>Please select an answer</span>
              </ErrorMessage>
            )}
          </AnswerContainer>
        </Main>
      </>
    );
  }
};
export default Quiz;
