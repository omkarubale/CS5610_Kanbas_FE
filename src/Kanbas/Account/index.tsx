import Signin from "../../Users/Signin";
import { Routes, Route, Navigate } from "react-router-dom";
import Content from "../layout/Content";
import Profile from "../../Users/Profile";
export default function Account() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
      <Route path="Signin" element={<Signin />} />
      <Route path="Profile" element={<Profile />} />
    </Routes>
  );
}
