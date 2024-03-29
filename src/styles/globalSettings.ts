import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const theme = {
  size: {
    smallmobile: '500px',
    mobile: '768px',
    tablet: '1024px',
  },

  colors: {
    primary: '#A729F5',
    secondary: '#313E51',
    tertiary: '#3B4D66',
    quaternary: '#626c7f',
    quinary: '#abc1e1',
    senary: '#f4f6fa',
    septenary: '#ffffff',
    octonary: '#26d782',
    nonary: '#ee5454',
    denary: ' #D394fa',
    oncery: '#f6e7ff'

    

    // Ajoutez d'autres couleurs ici
  },
  typography: {
    display: {
      fontFamily: 'Rubik-Medium, sans-serif',
      fontSize: '144px',
      lineHeight: '100%',
    },
    headingL: {
      fontFamily: 'Rubik-Medium, sans-serif',
      fontSize: '64px',
      lineHeight: '100%',
    },
    headingLRegular: {
      fontFamily: 'Rubik-Regular, sans-serif',
      fontSize: '64px',
      lineHeight: '100%',
      fontWeight: '300',
    },
    headingM: {
      fontFamily: 'Rubik-Medium, sans-serif',
      fontSize: '36px',
      lineHeight: '100%',
    },
    headingS: {
      fontFamily: 'Rubik-Medium, sans-serif',
      fontSize: '28px',
      lineHeight: '100%',
    },
    bodyM: {
      fontFamily: 'Rubik-Regular, sans-serif',
      fontSize: '24px',
      lineHeight: '150%',
    },
    bodyS: {
      fontFamily: 'Rubik-Italic, sans-serif',
      fontSize: '20px',
      lineHeight: '150%',
      fontWeight: '400',
    },
  },
};

interface GlobalStyleProps {
  $darkMode: boolean;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`

@font-face {
  font-family: Rubik-Regular;
  src: url('/fonts/static/Rubik-Regular.ttf');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: Rubik-Italic;
  src: url('/fonts/static/Rubik-Italic.ttf');
  font-weight: normal;
  font-style: italic;
}
@font-face {
  font-family: Rubik-Medium;
  src: url('/fonts/static/Rubik-Medium.ttf');
  font-weight: bold;
  font-style: normal;
}


  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    margin: 6% 9%;

    background: ${({ $darkMode }) =>
      $darkMode
        ? 'url("/images/pattern-background-desktop-dark.svg")'
        : 'url("/images/pattern-background-desktop-light.svg")'} 
      no-repeat center center fixed;
    background-size: cover;
    background-color: ${({ theme, $darkMode }) =>
      $darkMode ? theme.colors.secondary : theme.colors.senary};


    color: ${({ theme, $darkMode }) =>
      $darkMode ? theme.colors.septenary : theme.colors.secondary};



    @media screen and (max-width: ${({ theme }) => theme.size.tablet}){
     background: ${({ $darkMode }) =>
       $darkMode
         ? 'url("/images/pattern-background-tablet-dark.svg")'
         : 'url("/images/pattern-background-tablet-light.svg")'}
           no-repeat top -100px left fixed;
      background-size: 55% 65%;
      background-color: ${({ theme, $darkMode }) =>
        $darkMode ? theme.colors.secondary : theme.colors.senary};
           
    }
    @media screen and (max-width: ${({ theme }) => theme.size.mobile}){
      background: ${({ $darkMode }) =>
        $darkMode
          ? 'url("/images/pattern-background-mobile-dark.svg")'
          : 'url("/images/pattern-background-mobile-light.svg")'}
             no-repeat top left fixed;
      background-color: ${({ theme, $darkMode }) =>
        $darkMode ? theme.colors.secondary : theme.colors.senary};
           
    }
      
  }
  a {
    color: ${({ theme, $darkMode }) => ($darkMode ? theme.colors.septenary : theme.colors.secondary)};
    text-decoration: none;
  }

  li{
    list-style: none;
  }
  // Ajoutez d'autres styles globaux ici
`;


export const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.size.tablet}) {
    flex-direction: column;
    gap: 40px;
  }
`;