import axios from "axios";
import { IKanbasCourse } from "../store/interfaces/courses";

const COURSES_API = "http://localhost:4000/api/courses";
export const getCourses = async () => {
  const response = await axios.get(COURSES_API);
  return response.data;
};

export const createCourse = async (course: IKanbasCourse) => {
  const response = await axios.post(COURSES_API, course);
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}`);
  return response.data;
};

export const putCourse = async (course: IKanbasCourse) => {
  const response = await axios.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};

export const getCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}`);
  return response.data;
};
