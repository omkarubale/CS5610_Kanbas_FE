import "../../layout/common.css";
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
            <FaPlus /> Group
          </Button>
          <Button className="wd-button-red">
            <FaPlus /> Assignment
          </Button>
          <Button className="wd-button-standard">
            <FaEllipsisV />
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
