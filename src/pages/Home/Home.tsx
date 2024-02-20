import React from 'react';
import QuizzList from './quizzList/QuizzList';
import Header from '../../components/header/Header';
import Title from './title/Title';
import styled from 'styled-components';

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.size.tablet}) {
    flex-direction: column;
    gap: 40px;
  }
`;

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HomeContainer>
        <Title />
        <QuizzList />
      </HomeContainer>
    </>
  );
};

export default Home;
