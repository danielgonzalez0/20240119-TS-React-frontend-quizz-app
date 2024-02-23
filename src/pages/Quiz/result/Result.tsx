import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxTypedHooks';
import { RootState } from '../../../redux/store';
import { Main } from '../../../styles/globalSettings';
import { TitleContainer } from '../../Home/title/style';
import { ResultContainer, ScoreContainer } from './style';
import Icons from '../../../components/icons/Icons';
import MainButton from '../../../components/buttons/mainButton/MainButton';
import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  icon?: string;
  color?: string;
  length?: number;
  score?: number;
}

const Result: React.FC<Props> = ({ ...props }) => {
  const { title, icon, color, length, score } = props;
  const darkMode = useAppSelector((state: RootState) => state.darkMode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    console.log('click');
    dispatch({ type: 'quiz/setScore', payload: 0 });
    dispatch({ type: 'quiz/setCurrentQuestion', payload: 0 });
    dispatch({ type: 'quiz/deleteQuizInfos' });
    dispatch({ type: 'quiz/setIsFinished', payload: false });
    navigate('/');
  };

  return (
    <Main>
      <TitleContainer $darkMode={darkMode}>
        <p>Quiz completed</p>
        <h1>You scored...</h1>
      </TitleContainer>

      <ResultContainer>
        <ScoreContainer $darkMode={darkMode}>
          <Icons title={title} icon={icon} color={color} />
          <h2>{score}</h2>
          <span>out of {length}</span>
        </ScoreContainer>

        <MainButton onClick={handlePlayAgain}>Play Again</MainButton>
      </ResultContainer>
    </Main>
  );
};

export default Result;
