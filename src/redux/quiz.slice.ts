import { createSlice } from '@reduxjs/toolkit';

interface QuizState {
  id: number;
  title: string;
  icon: string;
  score: number;
  currentQuestion: number;
}

const initialState: QuizState = {
  id: 0,
  title: '',
  icon: '',
  score: 0,
  currentQuestion: 0,
};

const quizSlice = createSlice({
name: 'quiz',
initialState,
reducers: {
  setQuizInfos: (state, action) => {
    state.id = action.payload.id;
    state.title = action.payload.title;
    state.icon = action.payload.icon;
  },
  setScore: (state, action) => {
    state.score = action.payload;
  },
  setCurrentQuestion: (state, action) => {
    state.currentQuestion = action.payload;
  },
},
});

export const { setQuizInfos, setScore, setCurrentQuestion } = quizSlice.actions;

export default quizSlice.reducer;