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
