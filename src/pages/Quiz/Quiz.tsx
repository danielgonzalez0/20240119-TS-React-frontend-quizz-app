import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_QUIZ } from '../../graphql/queries';
import { AnswerContainer, CustomLink, ErrorMessage, Title } from './style';
import Header from '../../components/header/Header';
import { Main } from '../../styles/globalSettings';
import MainButton from '../../components/buttons/mainButton/MainButton';
import Question from './question/Question';
import SelectionElement from '../../components/list/SelectionElement';
import errorIcon from '../../assets/images/icon-error.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
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
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>('');
  const [score, setScore] = React.useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  //hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const scoreState = useAppSelector((state: RootState) => state.quiz.score);
  const currentQuestionState = useAppSelector(
    (state: RootState) => state.quiz.currentQuestion
  );
  const quizInfos = useAppSelector((state: RootState) => state.quiz);

  //functions
  const handleNextQuestion = async () => {
    if (currentQuestionState === (questions?.length ?? 0) - 1) {
      navigate('/result');
      return;
    }

    await nextQuestion();
    await nextOptions();
    await getAnswer();
    setIsAnswered(false);
    setSelectedOption('');
    console.log({ score });
  };

  const nextQuestion = async () => {
    if (questions === null) return;

    let newIndex: number;

    if (currentQuestionState < questions.length - 1) {
      console.log('currentQuestionState', currentQuestionState);
      console.log('questions.length', questions.length);

      newIndex = currentQuestionState + 1;
    } else {
      console.log('idenx 0');

      newIndex = 0;
    }

    dispatch({
      type: 'quiz/setCurrentQuestion',
      payload: newIndex,
    });
  };

  const nextOptions = async () => {
    if (questions === null) return null;
    if (currentQuestionState === null) return null;
    setOptions(questions[currentQuestionState + 1].options);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswered && selectedOption) return;
    setIsAnswered(false);
    setSelectedOption(option);
  };

  const getAnswer = async () => {
    if (questions === null) return null;
    if (currentQuestionState === null) return null;
    const answer = questions[currentQuestionState + 1].answer;
    setAnswer(answer);
  };

  const handleSubmitAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAnswered(true);
    if (!selectedOption) {
      return;
    }
    const answerToCheck = selectedOption;
    if (answerToCheck === answer) setScore(score + 1);
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
      // setCurrentQuestion(0);
      setQuestions(data.quiz.questions);
      setOptions(data.quiz.questions[0].options);
      setAnswer(data.quiz.questions[0].answer);
      dispatch({
        type: 'quiz/setQuizInfos',
        payload: {
          id: data.quiz.id,
          title: data.quiz.title,
          icon: data.quiz.icon,
        },
      });
      if (quizInfos.id !== Number(quizId)) {
        dispatch({ type: 'quiz/setScore', payload: 0 });
        dispatch({ type: 'quiz/setCurrentQuestion', payload: 0 });
      }
    }
  }, [data, quizId, quizInfos.id, dispatch]);

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

  if (
    data &&
    questions &&
    questions.length > 0 &&
    currentQuestionState !== null
  ) {
    return (
      <>
        <Header
          title={data.quiz.title}
          icon={data.quiz.icon}
          color={data.quiz.color}
        />
        <Main>
          <Question
            question={questions[currentQuestionState].question}
            length={questions.length}
            index={currentQuestionState}
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
