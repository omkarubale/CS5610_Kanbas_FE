import { FaEllipsisV, FaPlus } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import MiddleContent from "../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import AssignmentList from "./List";

function Assignments() {
  return (
    <>
      <MiddleContent>
        <MiddleContentActions>
          <input
            className="form-control w-25 float-start"
            type="text"
            id="assignment-search-input"
            placeholder="Search for Assignment"
          />
          <Button className="wd-button-standard">
            <div className="d-flex justify-content-center align-items-center">
              <FaPlus className="me-1" /> Group
            </div>
          </Button>
          <Button className="wd-button-red">
            <div className="d-flex justify-content-center align-items-center">
              <FaPlus className="me-1" /> Assignment
            </div>
          </Button>
          <Button className="wd-button-standard">
            <div className="d-flex justify-content-center align-items-center">
              <FaEllipsisV className="my-1" />
            </div>
          </Button>
        </MiddleContentActions>
        <hr />
        <MiddleContentData>
          <AssignmentList />
        </MiddleContentData>
      </MiddleContent>
    </>
  );
}
export default Assignments;
