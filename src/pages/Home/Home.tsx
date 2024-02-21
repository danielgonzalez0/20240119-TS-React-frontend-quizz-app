import React from 'react';
import QuizzList from './quizzList/QuizzList';
import Header from '../../components/header/Header';
import Title from './title/Title';
import { Main } from '../../styles/globalSettings';




const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Title />
        <QuizzList />
      </Main>
    </>
  );
};

export default Home;
