import { createSlice } from "@reduxjs/toolkit";
import {
  IKanbasQuizQuestion,
  IKanbasQuizQuestionMCQ,
} from "../../../../store/interfaces/quizzes";
import { eQuizQuestionType } from "../../../../store/enums/eQuizQuestionType";

const initialState: {
  questions: IKanbasQuizQuestion[];
} = {
  questions: [] as IKanbasQuizQuestion[],
};

const quizQuestionsSlice = createSlice({
  name: "quizQuestions",
  initialState,
  reducers: {
    setQuizQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action) => {
      const { tempQuizQuestionId, quizId } = action.payload;
      state.questions.push({
        _id: tempQuizQuestionId,
        quizId: quizId,
        quizQuestionType: eQuizQuestionType.MCQ,
        title: "New Question",
        questionText: "New Question Text",
        points: 1,
        answerChoices: [],
      } as IKanbasQuizQuestionMCQ);
    },
    setQuestion: (state, action) => {
      const quizQuestion = action.payload;

      state.questions = state.questions.map((qq) => {
        if (qq._id === quizQuestion._id) {
          return quizQuestion;
        } else {
          return qq;
        }
      });
    },
    removeQuestion: (state, action) => {
      const quizQuestion = action.payload;
      state.questions = state.questions.filter(
        (qq) => qq._id !== quizQuestion._id
      );
    },
  },
});

export const { setQuizQuestions, addQuestion, setQuestion, removeQuestion } =
  quizQuestionsSlice.actions;
export default quizQuestionsSlice.reducer;
