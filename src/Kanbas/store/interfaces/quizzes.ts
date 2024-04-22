import { eAssignmentGroup } from "../enums/eAssignmentGroup";
import { eQuizQuestionType } from "../enums/eQuizQuestionType";
import { eQuizType } from "../enums/eQuizType";

export interface IKanbasQuiz {
  _id: string;
  courseId: string; // Course
  title: string;
  assignmentGroup: eAssignmentGroup;
  availableDate: Date;
  availableUntilDate: Date;
  dueDate: Date;
  points: number;
  questionsCount: number;
  isMultipleAvailableDates: boolean;
  isPublished: boolean;
  description: string;
  quizType: eQuizType;
  accessCode: string;
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
  answerChoices: IKanbasQuizQuestionMCQChoice[];
}

export interface IKanbasQuizQuestionTrueFalse extends IKanbasQuizQuestion {
  correctBooleanAnswer: boolean;
}

export interface IKanbasQuizQuestionBlank extends IKanbasQuizQuestion {
  correctBlankAnswers: string[];
}
