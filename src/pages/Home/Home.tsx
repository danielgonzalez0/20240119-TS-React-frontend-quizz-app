import React from 'react';
import styled from 'styled-components';
import DarkModeBtn from '../../components/buttons/darkmode/DarkModeBtn';


const Title = styled.h1`
  font-family: ${(props) => props.theme.typography.headingL.fontFamily};
  font-size: ${(props) => props.theme.typography.headingL.fontSize};
  line-height: ${(props) => props.theme.typography.headingL.lineHeight};

  text-align: center;
`;

const Home: React.FC = () => {
  return (
    <>
      <Title>Lorem ipsum</Title>
      <DarkModeBtn />
    </>
  );
};

export default Home;