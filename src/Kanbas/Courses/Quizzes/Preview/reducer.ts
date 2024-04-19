import { createSlice } from "@reduxjs/toolkit";
import { IKanbasQuizQuestion } from "../../../store/interfaces/quizzes";
import { eQuizQuestionType } from "../../../store/enums/eQuizQuestionType";

const initialState: {
    flaggedQuestions: boolean[]; // To store flag status of each question for preview
    scrollToQuestion: Number;
} = {
    flaggedQuestions: [],
    scrollToQuestion: 0
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
        resetPreview: (state) => {
            state.flaggedQuestions = [];
        }

    },
});

export const {
    toggleFlagQuestion,
    setScrollToQuestion,
    resetPreview
} = quizPreview.actions;
export default quizPreview.reducer;
