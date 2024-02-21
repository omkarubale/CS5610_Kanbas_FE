import ModuleList from "./List";
import { FaEllipsisV, FaPlus, FaRegCheckCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import MiddleContent from "../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";

function Modules() {
  return (
    <>
      <MiddleContent>
        <MiddleContentActions>
          <div className="d-inline-flex" style={{ flexWrap: "wrap" }}>
            <Button className="wd-button-standard">Collapse All</Button>
            <Button className="wd-button-standard">View Progress</Button>
            <div className="d-inline-block">
              <Dropdown>
                <div>
                  <Dropdown.Toggle
                    className=" d-flex wd-button-standard justify-content-center align-items-center"
                    id="modulesActions"
                  >
                    <FaRegCheckCircle className="wd-icon-green me-1" />
                    Publish All
                  </Dropdown.Toggle>
                </div>
                <Dropdown.Menu>
                  <Dropdown.Item>Option 1</Dropdown.Item>
                  <Dropdown.Item>Option 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Button className="wd-button-red">
              <div className="d-flex justify-content-center align-items-center">
                <FaPlus className="me-1" /> Module
              </div>
            </Button>
            <Button className="wd-button-standard">
              <div className="d-flex justify-content-center align-items-center">
                <FaEllipsisV className="my-1" />
              </div>
            </Button>
          </div>
        </MiddleContentActions>
        <hr />
        <MiddleContentData>
          <ModuleList />
        </MiddleContentData>
      </MiddleContent>
    </>
  );
}
export default Modules;
