import styled from 'styled-components';

interface Props {
  $darkMode: boolean;
}

export const ListContainer = styled.li<Props>`
  font-family: ${({ theme }) => theme.typography.headingS.fontFamily};
  font-size: ${({ theme }) => theme.typography.headingS.fontSize};
  line-height: ${({ theme }) => theme.typography.headingS.lineHeight};
  display: flex;
  gap: 32px;
  padding: 18px 20px;
  border-radius: 24px;
  box-shadow: 0px 16px 40px 0px
    ${({ $darkMode }) => ($darkMode ? '#313e51' : '#8fa0c124')};

  background-color: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.tertiary : theme.colors.septenary};

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    gap: 16px;
    font-size: 18px;
  }
`;
export const ListIcon = styled.div`
  width: 56px;
  height: 56px;
  padding: 8px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.senary};
  color: ${({ theme }) => theme.colors.quaternary};
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    width: 40px;
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
