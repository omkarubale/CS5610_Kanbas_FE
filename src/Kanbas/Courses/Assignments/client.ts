import axios from "axios";
import { IKanbasAssignment } from "../../store/interfaces/assignments";
const COURSES_API = "http://localhost:4000/api/courses";
const ASSIGNMENTS_API = "http://localhost:4000/api/assignments";

export const getAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};
export const getAssignmentSectionsForCourse = async (courseId: string) => {
  const response = await axios.get(
    `${COURSES_API}/${courseId}/assignmentSections`
  );
  return response.data;
};
export const getAssignment = async (assignmentId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const createAssignment = async (
  courseId: string,
  assignment: IKanbasAssignment
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};
export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};
export const putAssignment = async (assignment: IKanbasAssignment) => {
  const response = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return response.data;
};
