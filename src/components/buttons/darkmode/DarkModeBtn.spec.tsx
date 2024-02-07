import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer, { toggleDarkMode } from '../../../redux/darkMode.slice';
import DarkModeBtn from './DarkModeBtn';
import { expect, test, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/globalSettings.ts';

test('dispatches toggleDarkMode action when button is clicked', async () => {
  // Configure le store Redux pour ton test
  const store = configureStore({
    reducer: {
      darkMode: darkModeReducer,
    },
  });

  // Efface les appels précédents à store.dispatch
  const mockDispatch = vi.fn();
  store.dispatch = mockDispatch;
  mockDispatch.mockClear();

  // Rend le composant DarkModeBtn dans un environnement simulé avec Happy DOM
  const { getByRole } = render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DarkModeBtn />
      </ThemeProvider>
    </Provider>
  );

  // Simule un clic sur le bouton

  const button = getByRole('button');
  fireEvent.click(button);

  // Attend que le dispatch soit effectué

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledWith(toggleDarkMode());
});
