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
import { Link } from "react-router-dom";

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
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <FaFileImport /> Import Existing Content
          </Link>
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <FaC /> Import from Commons
          </Link>
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <FaCrosshairs /> Choose Home Page
          </Link>
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <FaChartBar /> View Course Stream
          </Link>
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <FaBullhorn /> New Announcement
          </Link>
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <FaChartBar /> New Analytics
          </Link>
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <FaBell /> View Course Notifications
          </Link>
        </div>
      </div>
    </>
  );
}

export default CourseStatus;
