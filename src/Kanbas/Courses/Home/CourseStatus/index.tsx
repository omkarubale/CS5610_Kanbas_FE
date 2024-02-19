import {
  FaBan,
  FaBell,
  FaBullhorn,
  FaChartBar,
  FaCheckCircle,
  FaCrosshairs,
  FaFileImport,
} from "react-icons/fa";
import "./index.css";
import { FaC } from "react-icons/fa6";
import Button from "react-bootstrap/Button";

function CourseStatus() {
  return (
    <>
      <div className="wd-course-status">
        <span>
          <h2>Course Status</h2>
        </span>
        <div className="wd-course-status-publish-toggle">
          <div className="btn-group w-100">
            <Button className="btn wd-button-standard col-6">
              <FaBan /> Unpublish
            </Button>
            <Button className="btn wd-button-published col-6">
              <FaCheckCircle /> Published
            </Button>
          </div>
        </div>
        <div className="wd-course-status-actions d-grid gap-1">
          <a className="btn btn-block wd-button-standard text-start" href="#">
            <FaFileImport /> Import Existing Content
          </a>
          <a className="btn btn-block wd-button-standard text-start" href="#">
            <FaC /> Import from Commons
          </a>
          <a className="btn btn-block wd-button-standard text-start" href="#">
            <FaCrosshairs /> Choose Home Page
          </a>
          <a className="btn btn-block wd-button-standard text-start" href="#">
            <FaChartBar /> View Course Stream
          </a>
          <a className="btn btn-block wd-button-standard text-start" href="#">
            <FaBullhorn /> New Announcement
          </a>
          <a className="btn btn-block wd-button-standard text-start" href="#">
            <FaChartBar /> New Analytics
          </a>
          <a className="btn btn-block wd-button-standard text-start" href="#">
            <FaBell /> View Course Notifications
          </a>
        </div>
      </div>
    </>
  );
}

export default CourseStatus;
