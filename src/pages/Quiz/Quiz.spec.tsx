import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import Quiz from './Quiz';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/globalSettings';
import { GET_QUIZ } from '../../graphql/queries';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Store, configureStore } from '@reduxjs/toolkit';
import { RootState, rootReducer } from '../../redux/store';


describe('Quiz component', () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        quiz: {
          id: 1,
          title: 'Test Quiz',
          icon: 'test-icon',
          score: 0,
          currentQuestion: 0,
          isFinished: false,
          isAnswered: false,
          selectedOption: '',
        },
      },
    });
  });

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
  describe('when data is fetching', () => {
    test('should render loading message', () => {
      const loadingMocks: MockedResponse[] = [];
      renderComponent(loadingMocks, '/quiz/1');
      const loadingMessage = screen.getByText('Loading...');
      expect(loadingMessage).toBeInTheDocument();
    });

    test('should render error message', async () => {
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
  });

  describe('when data is fetched', () => {
    const dataMocks: MockedResponse[] = [
      {
        request: {
          query: GET_QUIZ,
          variables: { id: '1' },
        },
        result: {
          data: {
            quiz: {
              id: '1',
              title: 'Test Quiz',
              icon: 'icon.svg',
              color: '#fff1e9',
              questions: [
                {
                  question: 'question 1',
                  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                  answer: 'Option 1',
                },
                {
                  question: 'question 2',
                  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                  answer: 'Option 1',
                },
                {
                  question: 'question 3',
                  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                  answer: 'Option 1',
                },
              ],
            },
          },
        },
      },
    ];

    test('should render quiz header, title, question and options', async () => {
      renderComponent(dataMocks, '/quiz/1');

      const title = await screen.findByText('Test Quiz');
      const question = await screen.findByText('question 1');
      const option1 = await screen.findByText('Option 1');
      const option2 = await screen.findByText('Option 2');
      const option3 = await screen.findByText('Option 3');
      const option4 = await screen.findByText('Option 4');

      expect(title).toBeInTheDocument();
      expect(question).toBeInTheDocument();
      expect(option1).toBeInTheDocument();
      expect(option2).toBeInTheDocument();
      expect(option3).toBeInTheDocument();
      expect(option4).toBeInTheDocument();

      const iconHeader = screen.getByTestId('iconHeader');
      expect(iconHeader).toHaveStyle({ backgroundColor: '#fff1e9' });
      const imgHeader = screen.getByTestId('imgHeader');
      expect(imgHeader).toHaveAttribute('src', 'icon.svg');
    });
    test('should render "Please select an answer" message when no option is selected', async () => {
      renderComponent(dataMocks, '/quiz/1');
      await screen.findByText('Test Quiz');

      const submitButton = screen.getByRole('button', {
        name: /submit answer/i,
      });
      fireEvent.click(submitButton);
      const errorMessage = screen.getByText('Please select an answer');
      expect(errorMessage).toBeInTheDocument();
    });

    test('should render next question button when an option is selected', async () => {
      renderComponent(dataMocks, '/quiz/1');
      await screen.findByText('Test Quiz');

      const option1 = screen.getByTestId('index-0');
      fireEvent.click(option1);

      const answerButton = screen.getByRole('button', {
        name: /Submit Answer/i,
      });

      fireEvent.click(answerButton);

      const submitButton = screen.getByRole('button', {
        name: /Next Question/i,
      });
      expect(submitButton).toBeInTheDocument();
    });
    test('should render correct answer and update quiz store when correct option is submitted', async () => {
      renderComponent(dataMocks, '/quiz/1');
      await screen.findByText('Test Quiz');

      const option1 = screen.getByTestId('index-0');
      fireEvent.click(option1);

      const answerButton = screen.getByRole('button', {
        name: /Submit Answer/i,
      });

      fireEvent.click(answerButton);
      const state: RootState = store.getState();
   
      expect(option1).toHaveClass('correctAnswer');

      const submitButton = screen.getByRole('button', {
        name: /Next Question/i,
      });
      fireEvent.click(submitButton);

      await screen.findByText('question 2');

      expect(state.quiz.score).toBe(1);
      await waitFor(() =>
        expect(store.getState().quiz.currentQuestion).toBe(1)
      );
      expect(state.quiz.isFinished).toBe(false);

      // console.log(store.getState().quiz);
    });
    test('should render correct and false answer when false option is submitted', async () => {
      renderComponent(dataMocks, '/quiz/1');
      await screen.findByText('Test Quiz');

      const option1 = screen.getByTestId('index-0');
      const option2 = screen.getByTestId('index-1');
      fireEvent.click(option2);

      const answerButton = screen.getByRole('button', {
        name: /Submit Answer/i,
      });

      fireEvent.click(answerButton);
      const state: RootState = store.getState();

      expect(option1).toHaveClass('correct');
      expect(option2).toHaveClass('wrongAnswer');

      const submitButton = screen.getByRole('button', {
        name: /Next Question/i,
      });
      fireEvent.click(submitButton);

      expect(state.quiz.score).toBe(0);
      await waitFor(() =>
        expect(store.getState().quiz.currentQuestion).toBe(1)
      );
      expect(state.quiz.isFinished).toBe(false);
    expect(state.quiz.isAnswered).toBe(true);
    });

    test('should render final score and finish message when last question is submitted', async () => {
      store = configureStore({
        reducer: rootReducer,
        preloadedState: {
          quiz: {
            id: 1,
            title: 'Test Quiz',
            icon: 'test-icon',
            score: 2,
            currentQuestion: 2,
            isFinished: false,
            isAnswered: false,
            selectedOption: '',
          },
        },
      });
      renderComponent(dataMocks, '/quiz/1');
      await screen.findByText('question 3');
      const option1 = screen.getByTestId('index-0');
      fireEvent.click(option1);

      const answerButton = screen.getByRole('button', {
        name: /Submit Answer/i,
      });

      fireEvent.click(answerButton);
      const state: RootState = store.getState();

      const submitButton = screen.getByRole('button', {
        name: /Next Question/i,
      });

      fireEvent.click(submitButton);

      expect(state.quiz.score).toBe(3);
      await waitFor(() => {
        expect(store.getState().quiz.currentQuestion).toBe(2);
        expect(store.getState().quiz.isFinished).toBe(true);
      });

      await screen.findByText('Quiz completed');
      expect(screen.getByText('Play Again')).toBeInTheDocument();
    });

    //end of describe
  });

  //end of tests
});
