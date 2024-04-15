import axios from "axios";
import { IKanbasAssignment } from "../../store/interfaces/assignments";
const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API = `${API_BASE}/api/courses`;
const ASSIGNMENTS_API = `${API_BASE}/api/assignments`;

const api = axios.create({
  withCredentials: true,
});

export const getCourseAssignments = async (courseId: string) => {
  const response = await api.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};
export const getCourseAssignmentSections = async (courseId: string) => {
  const response = await api.get(
    `${COURSES_API}/${courseId}/assignmentSections`
  );
  return response.data;
};
export const getAssignment = async (assignmentId: string) => {
  const response = await api.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const createAssignment = async (
  courseId: string,
  assignment: IKanbasAssignment
) => {
  const response = await api.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};
export const deleteAssignment = async (assignmentId: string) => {
  const response = await api.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};
export const putAssignment = async (assignment: IKanbasAssignment) => {
  const response = await api.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return response.data;
};
