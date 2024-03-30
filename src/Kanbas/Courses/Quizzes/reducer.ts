import { createSlice, Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { quizzes, quizQuestions } from "./../../Database";
import {
  IKanbasQuiz,
  IKanbasQuizDetails,
  IKanbasQuizQuestion,
  IKanbasQuizQuestionBlank,
  IKanbasQuizQuestionMCQ,
  IKanbasQuizQuestionMCQChoice,
  IKanbasQuizQuestionTrueFalse,
} from "./../../store/interfaces/quizzes";
import { eAssignmentGroup } from "../../store/enums/eAssignmentGroup";
import { eQuizQuestionType } from "../../store/enums/eQuizQuestionType";

const initialState: {
  quizzesAvailable: boolean;
  quizzes: IKanbasQuiz[];
  quizzesDetails: IKanbasQuizDetails[]; // TEMP: till Node BE is implemented
  quiz: IKanbasQuizDetails;
  quizQuestions: IKanbasQuizQuestion[];
  quizQuestion: any; // Type interpreted at save call based on questionType
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
    points: 0,
    questionsCount: 0,
    isMultipleAvailableDates: false,
    isPublished: false,
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
    setQuizzes: (state) => {
      state.quizzes = state.quizzesDetails.map((q) => {
        const quiz = {
          _id: q._id,
          courseId: q.courseId,
          title: q.title,
          assignmentGroup: q.assignmentGroup,
          availableDate: q.availableDate,
          dueDate: q.dueDate,
          points: q.points,
          questionsCount: q.questionsCount,
          isMultipleAvailableDates: q.isMultipleAvailableDates,
          isPublished: q.isPublished,
        };
        return quiz;
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
      state.quizzesDetails = state.quizzesDetails.filter(
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
      state.quiz.dueDate = new Date("2021-01-01");
      state.quiz.points = 0;
      state.quiz.questionsCount = 0;
      state.quiz.isMultipleAvailableDates = false;
      state.quiz.isPublished = false;
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
    resetQuizQuestion: (state) => {
      state.quizQuestion._id = "123";
      state.quizQuestion.quizId = "0";
      state.quizQuestion.title = "New Question";
      state.quizQuestion.questionText = "New Question Text";
      state.quizQuestion.points = 1;
      state.quizQuestion.quizQuestionType = eQuizQuestionType.TrueOrFalse;
      state.quizQuestion.correctAnswer = true;
    },
  },
});

export const {
  setQuizzes,
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
} = quizzesSlice.actions;
export default quizzesSlice.reducer;

export const fetchQuizzes = async (
  dispatch: Dispatch<UnknownAction>,
  courseId: string
) => {
  const _quizzes = quizzes
    .filter((q) => q.courseId == courseId)
    .map((quiz) => {
      return {
        _id: quiz._id,
        courseId: quiz.courseId,
        title: quiz.title,
        assignmentGroup: eAssignmentGroup.Quizzes,
        availableDate: new Date(quiz.availableDate),
        dueDate: new Date(quiz.dueDate),
        points: quiz.points,
        questionsCount: quiz.questionsCount,
        isMultipleAvailableDates: quiz.isMultipleAvailableDates,
        isPublished: quiz.isPublished,
        isShuffleAnswers: quiz.isShuffleAnswers,
        timeLimit: quiz.timeLimit,
        isMultipleAttempts: quiz.isMultipleAttempts,
        showCorrectAnswersDate: new Date(quiz.showCorrectAnswersDate),
        isOneQuestionAtATime: quiz.isOneQuestionAtATime,
        isWebcamRequired: quiz.isWebcamRequired,
        isLockQuestionsAfterAnswering: quiz.isLockQuestionsAfterAnswering,
      } as IKanbasQuizDetails;
    });
  dispatch(setQuizzesDetails(_quizzes));
};

export const fetchQuizzQuestions = async (
  dispatch: Dispatch<UnknownAction>,
  quizId: string
) => {
  const _quizQuestions = quizQuestions
    .filter((qq) => qq.quizId == quizId)
    .map((quizQuestion) => {
      let _quizQuestion: IKanbasQuizQuestion | undefined = undefined;

      if (quizQuestion.quizQuestionType == eQuizQuestionType.MCQ) {
        _quizQuestion = {
          quizQuestionType: eQuizQuestionType.MCQ,
          choices:
            quizQuestion.choices?.map((c) => {
              return {
                choiceText: c.choiceText,
                isCorrect: c.isCorrect,
              } as IKanbasQuizQuestionMCQChoice;
            }) ?? [],
        } as IKanbasQuizQuestionMCQ;
      } else if (
        quizQuestion.quizQuestionType == eQuizQuestionType.TrueOrFalse
      ) {
        _quizQuestion = {
          quizQuestionType: eQuizQuestionType.TrueOrFalse,
          correctAnswer: quizQuestion.correctAnswer,
        } as IKanbasQuizQuestionTrueFalse;
      } else if (
        quizQuestion.quizQuestionType == eQuizQuestionType.FillInTheBlank
      ) {
        _quizQuestion = {
          quizQuestionType: eQuizQuestionType.FillInTheBlank,
          correctAnswers: quizQuestion.correctAnswers,
        } as IKanbasQuizQuestionBlank;
      } else {
        throw new Error("Question Type not supported!");
      }

      if (_quizQuestion !== undefined) {
        _quizQuestion._id = quizQuestion._id;
        _quizQuestion.quizId = quizQuestion.quizId;
        _quizQuestion.title = quizQuestion.title;
        _quizQuestion.questionText = quizQuestion.questionText;
        _quizQuestion.points = quizQuestion.points;

        return _quizQuestion;
      }
      throw new Error("Question Type not supported!");
    });
  dispatch(setQuizQuestions(_quizQuestions));
};
