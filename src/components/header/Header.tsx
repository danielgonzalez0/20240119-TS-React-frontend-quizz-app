import React from 'react';
import styled from 'styled-components';
import DarkModeBtn from '../buttons/darkmode/DarkModeBtn';
import Icons from '../icons/Icons';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 80px;

  #darkModeBtn {
    margin-left: auto;
  }

  @media screen and (max-width: ${({ theme }) => theme.size.tablet}) {
    margin-bottom: 40px;
  }
`;

interface HeaderProps {
  title?: string;
  icon?: string;
  color?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { title, icon, color } = props;

  return (
    <HeaderContainer>
      {Object.keys(props).length > 0 && (
        <Icons title={title} icon={icon} color={color} />
      )}
      <DarkModeBtn />
    </HeaderContainer>
  );
};

export default Header;
