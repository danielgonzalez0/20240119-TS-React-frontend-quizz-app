import { Link } from 'react-router-dom';
import styled from 'styled-components';

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