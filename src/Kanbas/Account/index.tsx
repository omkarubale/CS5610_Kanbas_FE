import Signin from "../../Users/Signin";
import { Routes, Route, Navigate } from "react-router-dom";
import Content from "../layout/Content";
import Profile from "../../Users/Profile";
import UserTable from "../../Users/Table";
import Signup from "../../Users/SignUp";
export default function Account() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
      <Route path="Signin" element={<Signin />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="/Admin/Users" element={<UserTable />} />
    </Routes>
  );
}
