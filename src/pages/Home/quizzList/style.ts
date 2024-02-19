import styled from 'styled-components';

interface QuizzListProps {
  $darkMode: boolean;
}

export const ListContainer = styled.ul`
  width: 50%;
  display: flex;
  gap: 20px;
  flex-direction: column;

  @media screen and (max-width: ${({ theme }) => theme.size.tablet}) {
    width: 100%;
  }
`;




export const IconTitle = styled.p`
  font-family: ${({theme}) => theme.typography.headingS.fontFamily};
  font-size: ${({theme}) => theme.typography.headingS.fontSize};
  line-height: ${({theme}) => theme.typography.headingS.lineHeight};
  display: flex;
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}){
    font-size:18px;
  }
`;

export const QuizzListContainer = styled.li<QuizzListProps>`
a{
  width: 100%;
  padding: 18px 20px;
  border-radius: 24px;
  background-color: ${({ $darkMode, theme }) =>
    $darkMode ? theme.colors.tertiary : theme.colors.septenary};
  display: flex;
  gap: 32px;

  .icon-container {
    width: 56px;
    height: 56px;
    padding: 8px;
    border-radius: 12px;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.size.smallmobile}) {
    gap: 16px;
    border-radius: 12px;
    .icon-container {
      width: 40px;
      height: 40px;
      padding: 6px;
    }
  }
}
`;
