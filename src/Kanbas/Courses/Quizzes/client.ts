import axios from "axios";
import {
  IKanbasQuiz,
  IKanbasQuizDetails,
  IKanbasQuizQuestion,
} from "../../store/interfaces/quizzes";

const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
const QUIZ_QUESTIONS_API = `${API_BASE}/api/quizQuestions`;

const api = axios.create({
  withCredentials: true,
});

export const getCourseQuizzes = async (courseId: string) => {
  const response = await api.get<IKanbasQuiz[]>(
    `${COURSES_API}/${courseId}/quizzes`
  );
  return response.data;
};

export const getQuizDetails = async (quizId: string) => {
  const response = await api.get<IKanbasQuizDetails>(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

export const postQuizSetPublish = async (
  quizId: string,
  isPublished: boolean
) => {
  const response = await api.post(`${QUIZZES_API}/${quizId}/publish`, {
    isPublished: isPublished,
  });
  return response.data;
};

// Quiz Questions
export const getQuizQuestions = async (quizId: string) => {
  const response = await axios.get<IKanbasQuizQuestion[]>(
    `${QUIZZES_API}/${quizId}/questions`
  );

  return response.data;
};

export const postQuizQuestions = async (
  quizId: string,
  quizQuestions: IKanbasQuizQuestion[]
) => {
  const response = await api.post(
    `${QUIZZES_API}/${quizId}/quizQuestions/bulkEdit`,
    quizQuestions
  );
  return response.data;
};

export const getQuizQuestion = async (quizQuestionId: string) => {
  const response = await api.get<IKanbasQuizQuestion>(
    `${QUIZ_QUESTIONS_API}/${quizQuestionId}`
  );
  return response.data;
};

export const createQuizQuestion = async (
  quizId: string,
  quizQuestion: IKanbasQuizQuestion
) => {
  const response = await api.post(
    `${QUIZZES_API}/${quizId}/quizQuestions`,
    quizQuestion
  );
  return response.data;
};

export const deleteQuizQuestion = async (quizQuestionId: string) => {
  const response = await api.delete(`${QUIZ_QUESTIONS_API}/${quizQuestionId}`);
  return response.data;
};

export const putModule = async (quizQuestion: IKanbasQuizQuestion) => {
  const response = await api.put(
    `${QUIZ_QUESTIONS_API}/${quizQuestion._id}`,
    quizQuestion
  );
  return response.data;
};
