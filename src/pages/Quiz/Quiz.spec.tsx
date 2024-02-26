import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import Quiz from './Quiz';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/globalSettings';
import { GET_QUIZ } from '../../graphql/queries';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Quiz component', () => {
  
  const renderComponent = (mocks: MockedResponse[], route: string) => {
    render(
      <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={[route]}>
              <Routes>
                <Route path="/quiz/:quizId" element={<Quiz />} />
              </Routes>
            </MemoryRouter>
          </ThemeProvider>
        </MockedProvider>
      </Provider>
    );
  };

  test('should render loading message when data fetching', () => {
    const loadingMocks: MockedResponse[] = [];
    renderComponent(loadingMocks, '/quiz/1');
    const loadingMessage = screen.getByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();
  });

  test('should render error message when data fetching', async () => {
    const errorMocks: MockedResponse[] = [
      {
        request: {
          query: GET_QUIZ,
          variables: { id: '1' },
        },
        error: new Error('An error occurred'),
      },
    ];
    renderComponent(errorMocks, '/quiz/1');

    await waitFor(() => {
      const errorMessage = screen.getByText('An error occurred');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('should render error message if data is empty', async () => {
    const emptyDataMocks: MockedResponse[] = [
      {
        request: {
          query: GET_QUIZ,
          variables: { id: '10' },
        },
        result: {
          data: {
            quiz: null,
          },
        },
      },
    ];

    renderComponent(emptyDataMocks, '/quiz/10');

    await waitFor(() => {
      const errorMessage = screen.getByText(
        'Error 404: this page does not exist.'
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  //end of tests
});
