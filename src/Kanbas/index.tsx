import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import "./index.css";
import Content from "./layout/Content";
import "./layout/common.css";
import { Provider } from "react-redux";
import store from "./store";
import Account from "./Account";

function Kanbas() {
  return (
    <>
      <Provider store={store}>
        <KanbasNavigation />
        <Content>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account/*" element={<Account />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Courses/:courseId/*" element={<Courses />} />
          </Routes>
        </Content>
      </Provider>
    </>
  );
}
export default Kanbas;
