import { createSlice } from "@reduxjs/toolkit";
import { IKanbasQuizQuestion } from "../../../store/interfaces/quizzes";
import { eQuizQuestionType } from "../../../store/enums/eQuizQuestionType";

const initialState: {
    flaggedQuestions: boolean[]; // To store flag status of each question for preview
    scrollToQuestion: Number;
    lastSavedTime: Date;
} = {
    flaggedQuestions: [],
    scrollToQuestion: 0,
    lastSavedTime: new Date(),
};

const quizPreview = createSlice({
    name: "quizPreview",
    initialState,
    reducers: {
        toggleFlagQuestion: (state, action) => {
            const questionIndex = action.payload;
            state.flaggedQuestions[questionIndex] = !state.flaggedQuestions[questionIndex];
        },
        setScrollToQuestion: (state, action) => {
            state.scrollToQuestion = action.payload;
        },
        updateLastSavedTime: (state, action) => {
            state.lastSavedTime = action.payload;
        },
        resetPreview: (state) => {
            state.flaggedQuestions = [];
        }

    },
});

export const {
    toggleFlagQuestion,
    setScrollToQuestion,
    updateLastSavedTime,
    resetPreview
} = quizPreview.actions;
export default quizPreview.reducer;
