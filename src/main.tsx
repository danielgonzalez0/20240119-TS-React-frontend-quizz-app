import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import Router from './router/Router.tsx';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </React.StrictMode>
  </Provider>
);
