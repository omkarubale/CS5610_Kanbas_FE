import axios from "axios";
import { IKanbasModule } from "../../store/interfaces/modules";

const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/modules`;

export const getCourseModules = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
export const createModule = async (courseId: string, module: IKanbasModule) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};
export const deleteModule = async (moduleId: string) => {
  const response = await axios.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};
export const putModule = async (module: IKanbasModule) => {
  const response = await axios.put(`${MODULES_API}/${module._id}`, module);
  return response.data;
};
