import { eAssignmentGroup } from "../enums/eAssignmentGroup";
import { eQuizQuestionType } from "../enums/eQuizQuestionType";

export interface IKanbasQuiz {
  _id: string;
  courseId: string; // Course
  title: string;
  assignmentGroup: eAssignmentGroup;
  availableDate: Date;
  dueDate: Date;
  points: number;
  questionsCount: number;
  isMultipleAvailableDates: boolean;
  isPublished: boolean;
}

export interface IKanbasQuizDetails extends IKanbasQuiz {
  isShuffleAnswers: boolean;
  timeLimit: number; // minutes
  isMultipleAttempts: boolean;
  showCorrectAnswersDate: Date;
  isOneQuestionAtATime: boolean;
  isWebcamRequired: boolean;
  isLockQuestionsAfterAnswering: boolean;
}

export interface IKanbasQuizQuestion {
  _id: string;
  quizId: string;
  quizQuestionType: eQuizQuestionType;
  title: string;
  questionText: string;
  points: number;
}

export interface IKanbasQuizQuestionMCQChoice {
  choiceText: string;
  isCorrect: boolean;
}

export interface IKanbasQuizQuestionMCQ extends IKanbasQuizQuestion {
  choices: IKanbasQuizQuestionMCQChoice[];
}

export interface IKanbasQuizQuestionBlank {
  correctAnswers: string[];
}
