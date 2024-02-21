import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/reduxTypedHooks';
import { RootState } from '../../../redux/store';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = styled.button<{ $darkMode: boolean }>`
  font-family: ${({ theme }) => theme.typography.headingS.fontFamily};
  font-size: ${({ theme }) => theme.typography.headingS.fontSize};
  line-height: ${({ theme }) => theme.typography.headingS.lineHeight};
  color: ${({ theme }) => theme.colors.septenary};
  width: 100%;
  height: 92px;
  border-radius: 24px;
  padding: 18px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0px 16px 40px 0px
    ${({ $darkMode }) => ($darkMode ? '#313e51' : '#8fa0c124')};
  border: none;
  outline: none;

  &:hover,
  &:focus-visible,
  &:active {
    background-color: ${({ theme }) => theme.colors.denary};
  }
  &:focus-visible,
  &:active {
    outline: solid 2px ${({ theme }) => theme.colors.primary};
  }

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    height: 56px;
  }
`;

const MainButton: React.FC<Props> = ({ onClick, children }) => {
  const darkMode = useAppSelector((state: RootState) => state.darkMode);
  return (
    <Button onClick={onClick} $darkMode={darkMode}>
      {children}
    </Button>
  );
};

export default MainButton;
