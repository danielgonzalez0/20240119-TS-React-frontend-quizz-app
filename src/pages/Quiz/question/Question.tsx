import React from 'react';
import { BarContainer, Container, ProgressBar } from './style';
import { useAppSelector } from '../../../hooks/reduxTypedHooks';
import { RootState } from '../../../redux/store';

interface Props {
  question: string;
  length: number;
  index: number;
}

const Question: React.FC<Props> = ({ question, length = 9, index = 0 }) => {

 const darkMode = useAppSelector((state: RootState) => state.darkMode);
  return (
    <Container $darkMode={darkMode}>
      <div className='container'>
      <span>{`Question ${index + 1} of ${length}`}</span>
      <p>{question}</p>
      </div>
      <BarContainer $darkMode={darkMode}>
        <ProgressBar
          style={{ width: `${(index + 1) * (100 / length)}%` }}
        ></ProgressBar>
      </BarContainer>
    </Container>
  );
};

export default Question;
