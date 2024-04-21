import { createSlice } from "@reduxjs/toolkit";
import { IKanbasQuizQuestion } from "../../../../store/interfaces/quizzes";
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
    addQuestion: (state) => {
      state.questions.push({
        _id: new Date().toUTCString(),
        points: 1,
        title: "",
        questionText: "",
        quizId: "",
        quizQuestionType: eQuizQuestionType.MCQ,
      } as IKanbasQuizQuestion);
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

export const { addQuestion, setQuestion, removeQuestion } =
  quizQuestionsSlice.actions;
export default quizQuestionsSlice.reducer;
