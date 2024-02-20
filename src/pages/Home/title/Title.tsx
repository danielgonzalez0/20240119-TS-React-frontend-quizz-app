import React from 'react';
import { useAppSelector } from '../../../hooks/reduxTypedHooks';
import { RootState } from '../../../redux/store';
import { TitleContainer } from './style';


const Title : React.FC = () => {
const darkMode = useAppSelector((state: RootState) => state.darkMode);
  return (
    <TitleContainer $darkMode = {darkMode}>
      <p>Welcome to the</p>
      <h1>Frontend Quiz!</h1>
      <span>Pick a subject to get started.</span>
    </TitleContainer>
  );
};

export default Title;