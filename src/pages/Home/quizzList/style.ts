import styled from "styled-components";

interface QuizzListProps {
  darkMode: boolean;
}

export const QuizzListContainer = styled.div<QuizzListProps>`
  padding: 20px;
  border-radius: 24px;
  margin: 20px;
  background-color: ${({ darkMode, theme }) =>
    darkMode ? theme.colors.tertiary : theme.colors.septenary};
  font-size: ${({ theme }) => theme.typography.headingS.fontSize};
  display: flex;
  
`;