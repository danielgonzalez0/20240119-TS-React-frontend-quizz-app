import { createGlobalStyle } from "styled-components";

export const theme = {

  
  
  colors: {
    primary: '#bf4f74',
    secondary: '#333',
    // Ajoutez d'autres couleurs ici
  },
  typography: {
    display: {
      fontFamiy: 'Rubik-Medium, sans-serif',
      fontSize: '144px',
      lineHeight: '100%',
    },
    headingL: {
      fontFamiy: 'Rubik-Medium, sans-serif',
      fontSize: '64px',
      lineHeight: '100%',
    },
    headingLRegular: {
      fontFamiy: 'Rubik-Regular, sans-serif',
      fontSize: '64px',
      lineHeight: '100%',
    },
    headingM: {
      fontFamiy: 'Rubik-Medium, sans-serif',
      fontSize: '36px',
      lineHeight: '100%',
    },
    headingS: {
      fontFamiy: 'Rubik-Medium, sans-serif',
      fontSize: '28px',
      lineHeight: '100%',
    },
    bodyM: {
      fontFamiy: 'Rubik-Regular, sans-serif',
      fontSize: '12px',
      lineHeight: '150%',
    },
    bodyS: {
      fontFamiy: 'Rubik-Italic, sans-serif',
      fontSize: '12px',
      lineHeight: '150%',
    }
   
  },
};


export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: Rubik-Regular;
  src: url('../../assets/fonts/static/Rubik-Regular.ttf');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: Rubik-Italic;
  src: url('../../assets/fonts/static/Rubik-Italic.ttf');
  font-weight: normal;
  font-style: italic;
}
@font-face {
  font-family: Rubik-Medium;
  src: url('../../assets/fonts/static/Rubik-Medium.ttf');
  font-weight: bold;
  font-style: normal;
}


  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  a {
    color: ${({theme}) => theme.colors.primary};
    text-decoration: none;
  }
  // Ajoutez d'autres styles globaux ici
`;