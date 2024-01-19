import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from './styles/globalSettings.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    <App />
    </ThemeProvider>
  </React.StrictMode>,
)
