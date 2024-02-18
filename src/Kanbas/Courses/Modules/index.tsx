import ModuleList from "./List";
import "../../../../src/App.css"; // TODO: remove this
import { FaEllipsisV, FaPlus, FaRegCheckCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";

function Modules() {
  return (
    <>
      <div className="wd-middle-content flex-fill">
        <div>
          <div className="wd-middle-content-actions">
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
          </div>
          <hr />
          <div className="wd-middle-content-data">
            <ModuleList />
          </div>
        </div>
      </div>
      {/* <div className="wd-right-side d-none d-lg-block"></div> */}
    </>
  );
}
export default Modules;
