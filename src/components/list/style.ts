import styled from 'styled-components';

interface Props {
  $darkMode: boolean;
}

export const ListIcon = styled.div`
  flex: 0 0 56px;
  height: 56px;
  padding: 8px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.senary};
  color: ${({ theme }) => theme.colors.quaternary};
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    flex: 0 0 40px;
    height: 40px;
    padding: 6px;
  }
`;

export const ListTitle = styled.div<Props>`
  display: flex;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    font-size: 18px;
  }
`;

export const ListContainer = styled.li<Props>`
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.headingS.fontFamily};
  font-size: ${({ theme }) => theme.typography.headingS.fontSize};
  line-height: ${({ theme }) => theme.typography.headingS.lineHeight};
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 18px 20px;
  border-radius: 24px;
  box-shadow: 0px 16px 40px 0px
    ${({ $darkMode }) => ($darkMode ? '#313e51' : '#8fa0c124')};

  background-color: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.tertiary : theme.colors.septenary};

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
  }

  &:hover ${ListIcon}, &:focus ${ListIcon} {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.oncery};
  }

  &.active {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
  }
  &.active ${ListIcon} {
    color: ${({ theme }) => theme.colors.septenary};
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &.correctAnswer {
    outline: 3px solid ${({ theme }) => theme.colors.octonary};
  }
  &.wrongAnswer {
    outline: 3px solid ${({ theme }) => theme.colors.nonary};
  }

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    gap: 16px;
    font-size: 18px;
  }
`;

export const ListIconAnswer = styled.img`
 
    margin-left: auto;
 
  width: 40px;
  height: 40px;
  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    width: 30px;
    height: 30px;
  }
`;
