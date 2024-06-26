import axios from "axios";
import { IKanbasModule } from "../../store/interfaces/modules";

const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/modules`;

const api = axios.create({
  withCredentials: true,
});

export const getCourseModules = async (courseId: string) => {
  const response = await api.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
export const createModule = async (courseId: string, module: IKanbasModule) => {
  const response = await api.post(`${COURSES_API}/${courseId}/modules`, module);
  return response.data;
};
export const deleteModule = async (moduleId: string) => {
  const response = await api.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};
export const putModule = async (module: IKanbasModule) => {
  const response = await api.put(`${MODULES_API}/${module._id}`, module);
  return response.data;
};
