import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/reducer";
import navigationReducer from "./../Navigation/reducer";
import coursesReducer from "../Courses/reducer";
import quizzesReducer from "../Courses/Quizzes/reducer";
import quizPreviewReducer from "../Courses/Quizzes/Preview/reducer";
import quizQuestionsReducer from "../Courses/Quizzes/Editor/Questions/reducer";
import { IKanbasModule } from "./interfaces/modules";
import { IKanbasCourse } from "./interfaces/courses";
import {
  IKanbasAssignment,
  IKanbasAssignmentSection,
} from "./interfaces/assignments";
import {
  IKanbasQuiz,
  IKanbasQuizDetails,
  IKanbasQuizQuestion,
} from "./interfaces/quizzes";
export interface KanbasState {
  navigationReducer: {
    navigationTitle: string;
    subNavigationTitle: string;
  };
  modulesReducer: {
    modules: IKanbasModule[];
    module: IKanbasModule;
    addModuleDrawerOpen: boolean;
  };
  coursesReducer: {
    courses: IKanbasCourse[];
    course: IKanbasCourse;
  };
  assignmentsReducer: {
    assignments: IKanbasAssignment[];
    assignment: IKanbasAssignment;
    assignmentSections: IKanbasAssignmentSection[];
  };
  quizzesReducer: {
    quizzesAvailable: boolean;
    quizzes: IKanbasQuiz[];
    quizzesDetails: IKanbasQuizDetails[]; // TEMP: till Node BE is implemented
    quiz: IKanbasQuizDetails;
    quizQuestions: IKanbasQuizQuestion[];
    quizQuestion: any;
    currentQuestionIndex: number;
  };
  quizPreviewReducer: {
    flaggedQuestions: boolean[];
    questionRefs: [];
    scrollToQuestion: any;
    lastSavedTime: Date;
  };
  quizQuestionsReducer: {
    questions: IKanbasQuizQuestion[];
  };
}
const store = configureStore({
  reducer: {
    navigationReducer,
    modulesReducer,
    coursesReducer,
    assignmentsReducer,
    quizzesReducer,
    quizPreviewReducer,
    quizQuestionsReducer,
  },
});

export default store;
