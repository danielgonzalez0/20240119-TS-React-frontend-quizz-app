import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/globalSettings.ts';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
