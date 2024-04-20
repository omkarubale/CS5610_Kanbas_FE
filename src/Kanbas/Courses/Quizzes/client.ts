import axios from "axios";
import {
  IKanbasQuiz,
  IKanbasQuizDetails,
  IKanbasQuizQuestion,
} from "../../store/interfaces/quizzes";

const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

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

export const getQuizQuestions = async (quizId: string) => {
  const response = await axios.get<IKanbasQuizQuestion[]>(
    `${QUIZZES_API}/${quizId}/questions`
  );

  return response.data;
}
