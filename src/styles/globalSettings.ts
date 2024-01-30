import { createGlobalStyle } from "styled-components";

export const theme = {

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
      fontSize: '12px',
      lineHeight: '150%',
    },
    bodyS: {
      fontFamily: 'Rubik-Italic, sans-serif',
      fontSize: '12px',
      lineHeight: '150%',
    }
   
  },
};


export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: Rubik-Regular;
  src: url('/src/assets/fonts/static/Rubik-Regular.ttf');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: Rubik-Italic;
  src: url('/src/assets/fonts/static/Rubik-Italic.ttf');
  font-weight: normal;
  font-style: italic;
}
@font-face {
  font-family: Rubik-Medium;
  src: url('src/assets/fonts/static/Rubik-Medium.ttf');
  font-weight: bold;
  font-style: normal;
}


  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* font-family: Rubik-Regular, sans-serif; */
    color: ${({ theme }) => theme.colors.secondary};
  }
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
  }
  // Ajoutez d'autres styles globaux ici
`;