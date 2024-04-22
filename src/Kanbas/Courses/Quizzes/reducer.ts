import { createSlice } from "@reduxjs/toolkit";
import {
  IKanbasQuiz,
  IKanbasQuizDetails,
  IKanbasQuizQuestion,
} from "./../../store/interfaces/quizzes";
import { eAssignmentGroup } from "../../store/enums/eAssignmentGroup";
import { eQuizQuestionType } from "../../store/enums/eQuizQuestionType";
import { eQuizType } from "../../store/enums/eQuizType";

const initialState: {
  quizzesAvailable: boolean;
  quizzes: IKanbasQuiz[];
  quizzesDetails: IKanbasQuizDetails[]; // TEMP: till Node BE is implemented
  quiz: IKanbasQuizDetails;
  quizQuestions: IKanbasQuizQuestion[];
  quizQuestion: any; // Type interpreted at save call based on questionType
  currentQuestionIndex: number; // Index of current question being viewed
} = {
  quizzesAvailable: false,
  quizzes: [] as IKanbasQuiz[],
  quizzesDetails: [] as IKanbasQuizDetails[], // TEMP: till Node BE is implemented
  quiz: {
    _id: "1234",
    courseId: "0", // Course
    title: "New Quiz",
    assignmentGroup: eAssignmentGroup.Quizzes,
    availableDate: new Date("2021-01-01"),
    dueDate: new Date("2021-01-01"),
    availableUntilDate: new Date("2021-04-10"),
    points: 0,
    questionsCount: 0,
    isMultipleAvailableDates: false,
    isPublished: false,
    description: "",
    quizType: eQuizType.GRADED_QUIZ,
    accessCode: "",
    isShuffleAnswers: false,
    timeLimit: 0, // minutes
    isMultipleAttempts: false,
    showCorrectAnswersDate: new Date("2021-01-01"),
    isOneQuestionAtATime: false,
    isWebcamRequired: false,
    isLockQuestionsAfterAnswering: false,
  },
  quizQuestions: [] as IKanbasQuizQuestion[],
  quizQuestion: {
    _id: "123",
    quizId: "0",
    title: "New Question",
    questionText: "New Question Text",
    points: 1,
    quizQuestionType: eQuizQuestionType.TrueOrFalse,
    correctAnswer: true,
  },
  currentQuestionIndex: 0,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    // TEMP: till Node BE is implemented
    setQuizzesDetails: (state, action) => {
      if (!state.quizzesAvailable) {
        state.quizzesDetails = action.payload;
        state.quizzesAvailable = true;
      }
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    setQuizPublished: (state, action) => {
      const { quizId, isPublish } = action.payload;
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === quizId) {
          return { ...quiz, isPublished: isPublish };
        } else {
          return quiz;
        }
      });
    },
    addQuiz: (state, action) => {
      const courseId = action.payload.course;

      state.quiz = {
        ...state.quiz,
        courseId: courseId,
        _id: new Date().getTime().toString(),
      };

      state.quizzesDetails = [...state.quizzesDetails, state.quiz];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
    updateQuiz: (state) => {
      state.quizzesDetails = state.quizzesDetails.map((quiz) => {
        if (quiz._id === state.quiz._id) {
          return state.quiz;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setQuizById: (state, action) => {
      const quizId = action.payload;
      const quiz = state.quizzesDetails.find((q) => q._id == quizId);

      if (quiz !== undefined) state.quiz = quiz;
    },
    resetQuiz: (state) => {
      state.quiz._id = "1234";
      state.quiz.courseId = "0";
      state.quiz.title = "New Quiz";
      state.quiz.assignmentGroup = eAssignmentGroup.Quizzes;
      state.quiz.availableDate = new Date("2021-01-01");
      state.quiz.availableUntilDate = new Date("2021-01-02");
      state.quiz.dueDate = new Date("2021-01-01");
      state.quiz.points = 0;
      state.quiz.questionsCount = 0;
      state.quiz.isMultipleAvailableDates = false;
      state.quiz.isPublished = false;
      state.quiz.description = "";
      state.quiz.quizType = eQuizType.GRADED_QUIZ;
      state.quiz.accessCode = "";
      state.quiz.isShuffleAnswers = false;
      state.quiz.timeLimit = 0;
      state.quiz.isMultipleAttempts = false;
      state.quiz.showCorrectAnswersDate = new Date("2021-01-01");
      state.quiz.isOneQuestionAtATime = false;
      state.quiz.isWebcamRequired = false;
      state.quiz.isLockQuestionsAfterAnswering = false;
    },

    // Quiz Questions
    setQuizQuestions: (state, action) => {
      state.quizQuestions = action.payload;
    },
    addQuizQuestion: (state, action) => {
      const quizId = action.payload.quizId;

      state.quizQuestion = {
        ...state.quizQuestion,
        quizId: quizId,
        _id: new Date().getTime().toString(),
      };

      state.quizQuestions = [...state.quizQuestions, state.quizQuestion];
    },
    deleteQuizQuestion: (state, action) => {
      state.quizQuestions = state.quizQuestions.filter(
        (quizQuestion) => quizQuestion._id !== action.payload
      );
    },
    updateQuizQuestion: (state) => {
      state.quizQuestions = state.quizQuestions.map((quizQuestion) => {
        if (quizQuestion._id === state.quizQuestion._id) {
          return state.quizQuestion;
        } else {
          return quizQuestion;
        }
      });
    },
    setQuizQuestion: (state, action) => {
      state.quizQuestion = action.payload;
    },
    setQuizQuestionById: (state, action) => {
      const quizQuestionId = action.payload;
      const quizQuestion = state.quizQuestions.find(
        (qq) => qq._id == quizQuestionId
      );

      if (quizQuestion !== undefined) state.quizQuestion = quizQuestion;
    },
    goToQuestion: (state, action) => {
      const newIndex = state.currentQuestionIndex + action.payload;
      state.currentQuestionIndex = Math.min(
        Math.max(newIndex, 0),
        state.quizQuestions.length - 1
      );
    },
    setActiveQuestion: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    resetQuizQuestion: (state) => {
      state.quizQuestion._id = "123";
      state.quizQuestion.quizId = "0";
      state.quizQuestion.title = "New Question";
      state.quizQuestion.questionText = "New Question Text";
      state.quizQuestion.points = 1;
      state.quizQuestion.quizQuestionType = eQuizQuestionType.TrueOrFalse;
      state.quizQuestion.correctAnswer = true;
    },
    resetPreview: (state) => {
      state.currentQuestionIndex = 0;
    },
  },
});

export const {
  setQuizzes,
  setQuizPublished,
  setQuizzesDetails,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizById,
  resetQuiz,

  // quizQuestions
  setQuizQuestions,
  addQuizQuestion,
  deleteQuizQuestion,
  updateQuizQuestion,
  setQuizQuestion,
  setQuizQuestionById,
  goToQuestion,
  setActiveQuestion,
  resetPreview,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
