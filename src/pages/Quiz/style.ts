import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  $darkMode: boolean;
}

export const Title = styled.h1`
  font-family: ${(props) => props.theme.typography.headingM.fontFamily};
  font-size: ${(props) => props.theme.typography.headingM.fontSize};
  line-height: ${(props) => props.theme.typography.headingM.lineHeight};
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  margin: 0 20px;
  justify-content: center;
  max-width: 100vw;
  height: 80vh;
  text-align: center;
`;

export const CustomLink = styled(Link)`
  font-size: ${(props) => props.theme.typography.headingS.fontSize};
  color: ${(props) => props.theme.colors.primary};
`;

export const AnswerContainer = styled.div`
  flex: 0 0 50%;
  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
  }
`;

export const ErrorMessage = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  span {
    color: ${({ theme, $darkMode }) =>
      $darkMode ? theme.colors.septenary : theme.colors.nonary};
    font-family: ${({ theme }) => theme.typography.bodyM.fontFamily};
    font-size: ${({ theme }) => theme.typography.bodyM.fontSize};
    line-height: ${({ theme }) => theme.typography.bodyM.lineHeight};
  }

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    span {
      font-size: 18px;
    }
  }
`;
