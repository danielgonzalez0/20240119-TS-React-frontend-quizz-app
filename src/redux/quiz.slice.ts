import { createSlice } from '@reduxjs/toolkit';

interface QuizState {
  id: number;
  title: string;
  icon: string;
  score: number;
  currentQuestion: number;
  isFinished: boolean;
  isAnswered: boolean;
  selectedOption: string;
}

const defaultState: QuizState = {
  id: 0,
  title: '',
  icon: '',
  score: 0,
  currentQuestion: 0,
  isFinished: false,
  isAnswered: false,
  selectedOption: '',
};

const savedQuizState = localStorage.getItem('quizState');

const initialState: QuizState = savedQuizState
  ? JSON.parse(savedQuizState)
  : defaultState;

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizInfos: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.icon = action.payload.icon;
    },

    deleteQuizInfos: (state) => {
      state.id = 0;
      state.title = '';
      state.icon = '';
    },

    setScore: (state, action) => {
      state.score = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setIsFinished: (state, action) => {
      state.isFinished = action.payload;
    },
    setIsAnswered: (state, action) => {
      state.isAnswered = action.payload;
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    }
  });

export const {
  setQuizInfos,
  setScore,
  setCurrentQuestion,
  deleteQuizInfos,
  setIsFinished,
  setIsAnswered,
  setSelectedOption,
} = quizSlice.actions;

export default quizSlice.reducer;
