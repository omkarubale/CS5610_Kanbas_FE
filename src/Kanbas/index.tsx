import { Link } from "react-router-dom";
import Nav from "../Nav";
import KanbasNavigation from "./Navigation";

function Kanbas() {
  return (
    <>
      <KanbasNavigation />
      <div className="d-flex">
        {/* <div style={{ flexGrow: 1 }}>
        <h1>Account</h1>
        <h1>Dashboard</h1>
        <h1>Courses</h1>
      </div> */}
      </div>
    </>
  );
}
export default Kanbas;
