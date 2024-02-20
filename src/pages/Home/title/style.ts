import styled from 'styled-components';


interface Props {
  $darkMode: boolean;
}

export const TitleContainer = styled.div<Props>`
  flex: 0 0 55%;
  p {
    font-family: ${({ theme }) => theme.typography.headingLRegular.fontFamily};
    font-size: ${({ theme }) => theme.typography.headingLRegular.fontSize};
    line-height: ${({ theme }) => theme.typography.headingLRegular.lineHeight};
    font-weight: ${({ theme }) => theme.typography.headingLRegular.fontWeight};
  }
  h1 {
    font-family: ${({ theme }) => theme.typography.headingL.fontFamily};
    font-size: ${({ theme }) => theme.typography.headingL.fontSize};
    line-height: ${({ theme }) => theme.typography.headingL.lineHeight};
    margin-bottom: 40px;
  }
  span {
    font-family: ${({ theme }) => theme.typography.bodyS.fontFamily};
    font-size: ${({ theme }) => theme.typography.bodyS.fontSize};
    line-height: ${({ theme }) => theme.typography.bodyS.lineHeight};
    color: ${({ $darkMode, theme }) =>
      $darkMode ? theme.colors.quinary : theme.colors.quaternary};
  }

  @media screen and (max-width: ${({ theme }) => theme.size.tablet}) {
    h1 {
      margin-bottom: 10px;
    }

    @media screen and (max-width: 575px) {
      p {
        font-size: 40px;
        line-height: 40px;
      }
      h1 {
        font-size: 40px;
        line-height: 40px;
      }
      span {
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
`;