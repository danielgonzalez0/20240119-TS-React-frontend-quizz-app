import React from 'react';
import QuizzList from './quizzList/QuizzList';
import Header from '../../components/header/Header';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <QuizzList />
    </>
  );
};

export default Home;
