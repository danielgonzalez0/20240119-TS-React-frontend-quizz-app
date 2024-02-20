import {render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { expect, test } from 'vitest';
import QuizzList from './QuizzList';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from '../../../redux/store';
import { theme } from '../../../styles/globalSettings';
import { GET_QUIZZES } from '../../../graphql/queries';
import { MemoryRouter } from 'react-router-dom';

const mocks = [
  {
    request: {
      query: GET_QUIZZES,
    },
    result: {
      data: {
        quizzes: [
          { id: '1', title: 'HTML' },
          { id: '2', title: 'CSS' },
          { id: '3', title: 'JAVASCRIPT' },
          { id: '4', title: 'ACCESSIBILITY' },
        ],
      },
    },
  },
];

test('renders quiz links with correct text and URL', async () => {
  
  render(
    <Provider store={store}>
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ThemeProvider theme={theme}>
            <QuizzList />
          </ThemeProvider>
        </MockedProvider>
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => screen.getByTestId('list-test'));

  const links = screen.getAllByRole('link') as HTMLAnchorElement[];
  expect(links).toHaveLength(4);
  expect(links[0].children[0].textContent).toBe('HTML');
  expect(links[0].getAttribute('href')).toBe('/quiz/1');
});
