import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const getCourseQuizzes = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const getQuizDetails = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const postQuizSetPublish = async (
  quizId: string,
  isPublished: boolean
) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/publish`, {
    isPublished: isPublished,
  });
  return response.data;
};
