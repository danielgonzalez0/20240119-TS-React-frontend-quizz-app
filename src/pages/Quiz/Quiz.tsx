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
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import store, { RootState } from '../../redux/store';
import Result from './result/Result';


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
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>('');
  
  //hooks
  const dispatch = useAppDispatch();
  const scoreState = useAppSelector((state: RootState) => state.quiz.score);
  const currentQuestionState = useAppSelector(
    (state: RootState) => state.quiz.currentQuestion
  );
  const quizInfos = useAppSelector((state: RootState) => state.quiz);
  const isFinisehdState = useAppSelector(
    (state: RootState) => state.quiz.isFinished
  );
  const isAnswered = useAppSelector((state: RootState) => state.quiz.isAnswered);

  const setIsAnswered = (value: boolean) => dispatch({ type: 'quiz/setIsAnswered', payload: value });

  const selectedOption = useAppSelector((state: RootState) => state.quiz.selectedOption);
  const setSelectedOption = (value: string) => dispatch({ type: 'quiz/setSelectedOption', payload: value });


  //functions
  const handleNextQuestion = async () => {
    await nextQuestion();
    await nextOptions();
    await getAnswer();
    setIsAnswered(false);
    setSelectedOption('');
  };

  const handleLocalStorage = () => {
    const quizState = store.getState().quiz;
    localStorage.setItem('quizState', JSON.stringify(quizState));
  };

  const nextQuestion = async () => {
    let newIndex: number;

    if (currentQuestionState < questions.length - 1) {
      newIndex = currentQuestionState + 1;
      dispatch({
        type: 'quiz/setCurrentQuestion',
        payload: newIndex,
      });
      handleLocalStorage();
    } else {
      localStorage.removeItem('quizState');
      dispatch({ type: 'quiz/setIsFinished', payload: true });
    }
  };

  const nextOptions = async () => {
    if (currentQuestionState + 1 === questions.length) return;
    setOptions(questions[currentQuestionState + 1].options);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswered && selectedOption) return;
    setIsAnswered(false);
    setSelectedOption(option);
  };

  const getAnswer = async () => {
    if (currentQuestionState + 1 === questions.length) return;
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
    if (answerToCheck === answer)
      dispatch({ type: 'quiz/setScore', payload: scoreState + 1 });
handleLocalStorage();

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
    const dataLocal = JSON.parse(localStorage.getItem('quizState') || '{}');
    const localQuizId = dataLocal ? Number(dataLocal.id) : 0;
    
    if (data && data.quiz) {
      if (Number(quizInfos.id) !== Number(quizId)) {
        dispatch({ type: 'quiz/setScore', payload: 0 });
        dispatch({ type: 'quiz/setCurrentQuestion', payload: 0 });
        dispatch({ type: 'quiz/setIsFinished', payload: false });
        dispatch({ type: 'quiz/setIsAnswered', payload: false });
      }
      if (localQuizId !== Number(quizId)) localStorage.removeItem('quizState');
        
      setQuestions(data.quiz.questions);
      setOptions(data.quiz.questions[currentQuestionState].options);
      setAnswer(data.quiz.questions[currentQuestionState].answer);
      dispatch({
        type: 'quiz/setQuizInfos',
        payload: {
          id: data.quiz.id,
          title: data.quiz.title,
          icon: data.quiz.icon,
        },
      });
    }
  }, [data, quizId, quizInfos.id, dispatch, currentQuestionState]);

  //rendering
  if (loading) return <Title>Loading...</Title>;

  if (error) return <Title>An error occurred</Title>;

  if (!data.quiz)
    return (
      <Title>
        <span>Error 404: this page does not exist.</span>
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
          {isFinisehdState ? (
            <Result
              title={data.quiz.title}
              icon={data.quiz.icon}
              color={data.quiz.color}
              score={scoreState}
              length={questions.length}
            />
          ) : (
            <>
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
                      onKeyDown={(e?: React.KeyboardEvent<HTMLElement>) => {
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
            </>
          )}
        </Main>
      </>
    );
  }
};
export default Quiz;
