import axios from "axios";
export const BASE_API_URL = process.env.REACT_APP_API_BASE;
export const USERS_API_URL = `${BASE_API_URL}/api/users`;

export interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
}

export const signin = async (credentials: User) => {
  const response = await axios.post(`${USERS_API_URL}/signin`, credentials);
  return response.data;
};

export const profile = async () => {
  const response = await axios.post(`${USERS_API_URL}/profile`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axios.put(`${USERS_API_URL}/${user._id}`, user);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axios.get(`${USERS_API_URL}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API_URL}`, user);
  return response.data;
};

export const deleteUser = async (user: any) => {
  const response = await axios.delete(`${USERS_API_URL}/${user._id}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API_URL}/${id}`);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axios.get(`${USERS_API_URL}?role=${role}`);
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axios.post(`${USERS_API_URL}/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axios.post(`${USERS_API_URL}/signout`);
  return response.data;
};
