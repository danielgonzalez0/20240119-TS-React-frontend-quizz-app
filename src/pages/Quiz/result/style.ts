import styled from 'styled-components';

interface Props {
  $darkMode: boolean;
}

export const ResultContainer = styled.div`
  flex: 0 0 45%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

export const ScoreContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 20px;
  border-radius: 24px;
  margin-bottom: 40px;
  background-color: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.tertiary : theme.colors.septenary};
  box-shadow: 0px 16px 40px 0px
    ${({ $darkMode }) => ($darkMode ? '#313e51' : '#8fa0c124')};
  h2 {
    margin: 40px 0 20px;
    font-family: ${({ theme }) => theme.typography.display.fontFamily};
    font-size: ${({ theme }) => theme.typography.display.fontSize};
    line-height: ${({ theme }) => theme.typography.display.lineHeight};
  }

  span {
    font-family: ${({ theme }) => theme.typography.bodyM.fontFamily};
    font-size: ${({ theme }) => theme.typography.bodyM.fontSize};
    line-height: ${({ theme }) => theme.typography.bodyM.lineHeight};
    color: ${({ theme, $darkMode }) =>
      $darkMode ? theme.colors.quinary : theme.colors.quaternary};
  }

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    border-radius: 12px;
    h2 {
      font-size: 88px;
      line-height: 88px;
    }
    span {
      font-size: 18px;
      line-height: 18px;
    }
  }
`;
