import styled from 'styled-components';

interface Props {
  $darkMode: boolean;
}

export const Container = styled.div <Props>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 50%;
  padding-right: 100px;
  padding-bottom: 100px;
  min-height: 50vh;

  span {
    font-family: ${({ theme }) => theme.typography.bodyS.fontFamily};
    font-size: ${({ theme }) => theme.typography.bodyS.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyS.fontWeight};
    line-height: ${({ theme }) => theme.typography.bodyS.lineHeight};
    color: ${({ theme, $darkMode }) => $darkMode ? theme.colors.quinary: theme.colors.quaternary};
    margin-bottom: 16px;
  }

  p {
    font-family: ${({ theme }) => theme.typography.headingM.fontFamily};
    font-size: ${({ theme }) => theme.typography.headingM.fontSize};
    font-weight: ${({ theme }) => theme.typography.headingM.fontWeight};
    line-height: ${({ theme }) => theme.typography.headingM.lineHeight};
    color: ${({ theme, $darkMode }) => $darkMode ? theme.colors.septenary : theme.colors.secondary};
    margin: 30px 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.size.tablet}) {
    padding-right: 0;
    padding-bottom: 0;
    min-height: 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    p {
      font-size: 20px;
      line-height: 24px;
    }
    span {
      font-size: 16px;
      line-height: 21px;
    }
  }
`;

export const BarContainer = styled.div<Props>`
  width: 100%;
  height: 16px;
  background-color: ${({ theme, $darkMode }) => $darkMode ? theme.colors.tertiary : theme.colors.septenary};
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 65%;
  margin: 0 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 24px;
  transition: width 0.5s ease;
`;