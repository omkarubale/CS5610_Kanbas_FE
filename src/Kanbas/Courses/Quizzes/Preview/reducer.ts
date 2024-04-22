import { createSlice } from "@reduxjs/toolkit";
import { IKanbasQuizQuestion } from "../../../store/interfaces/quizzes";
import { eQuizQuestionType } from "../../../store/enums/eQuizQuestionType";

const initialState: {
  flaggedQuestions: boolean[]; // To store flag status of each question for preview
  questionRefs: (HTMLElement | null)[];
  scrollToQuestion: Number;
  lastSavedTime: Date;
} = {
  flaggedQuestions: [],
  questionRefs: [],
  scrollToQuestion: 0,
  lastSavedTime: new Date(),
};

const quizPreviewSlice = createSlice({
  name: "quizPreview",
  initialState,
  reducers: {
    toggleFlagQuestion: (state, action) => {
      const questionIndex = action.payload;
      state.flaggedQuestions[questionIndex] =
        !state.flaggedQuestions[questionIndex];
    },
    setQuestionRef: (state, action) => {
      const { index, ref } = action.payload;
      state.questionRefs[index] = ref;
    },
    setScrollToQuestion: (state, action) => {
      state.scrollToQuestion = action.payload;
    },
    updateLastSavedTime: (state, action) => {
      state.lastSavedTime = action.payload;
    },
    resetPreview: (state) => {
      state.flaggedQuestions = [];
    },
  },
});

export const {
  toggleFlagQuestion,
  setQuestionRef,
  setScrollToQuestion,
  updateLastSavedTime,
  resetPreview,
} = quizPreviewSlice.actions;
export default quizPreviewSlice.reducer;
