import ModuleList from "./../Modules/List";
import { FaEllipsisV, FaPlus, FaRegCheckCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import MiddleContent from "../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import RightSide from "../../layout/Content/NotLeftSide/RightSide";
import CourseStatus from "./CourseStatus";
import ComingUp from "./ComingUp";

function CoursesHome() {
  return (
    <>
      <MiddleContent>
        <MiddleContentActions>
          <Button className="wd-button-standard">Collapse All</Button>
          <Button className="wd-button-standard">View Progress</Button>
          <div className="dropdown d-inline-block">
            <Button
              className="wd-button-standard dropdown-toggle"
              type="button"
              id="modulesActions"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaRegCheckCircle />
              Publish All
            </Button>
            <div className="dropdown-menu" aria-labelledby="modulesActions">
              <a className="dropdown-item" href="#">
                Option 1
              </a>
              <a className="dropdown-item" href="#">
                Option 2
              </a>
            </div>
          </div>
          <Button className="wd-button-red">
            <FaPlus /> Module
          </Button>
          <Button className="wd-button-standard">
            <FaEllipsisV />
          </Button>
        </MiddleContentActions>
        <hr />
        <MiddleContentData>
          <ModuleList />
        </MiddleContentData>
      </MiddleContent>

      <RightSide>
        <CourseStatus />
        <ComingUp />
      </RightSide>
    </>
  );
}

export default CoursesHome;
