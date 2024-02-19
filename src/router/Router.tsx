import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle, theme } from '../styles/globalSettings';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { RootState } from '../redux/store';
import { ThemeProvider } from 'styled-components';
import Home from '../pages/Home/Home';
import Quiz from '../pages/Quiz/Quiz';

const AppRouter: React.FC = () => {
  const darkMode = useAppSelector((state: RootState) => state.darkMode);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle $darkMode={darkMode} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRouter;
