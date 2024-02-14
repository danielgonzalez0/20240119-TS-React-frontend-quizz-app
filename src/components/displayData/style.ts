import styled from 'styled-components';

interface DisplayDataContainerProps {
  darkMode: boolean;
}

export const DisplayDataContainer = styled.div<DisplayDataContainerProps>`
  padding: 20px;
  border-radius: 24px;
  margin: 20px;
  background-color: ${({ darkMode, theme }) =>
    darkMode ? theme.colors.tertiary : theme.colors.septenary};
  font-size: ${({ theme }) => theme.typography.headingS.fontSize};
  display: flex;
  flex-direction: column;
`;
