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
              <div className="d-flex justify-content-center align-items-center">
                <FaBan className="me-1" /> Unpublish
              </div>
            </Button>
            <Button className="btn wd-button-published col-6">
              <div className="d-flex justify-content-center align-items-center">
                <FaCheckCircle className="me-1" /> Published
              </div>
            </Button>
          </div>
        </div>
        <div className="wd-course-status-actions d-grid gap-1">
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <div className="d-flex align-items-center">
              <FaFileImport className="me-1" /> Import Existing Content
            </div>
          </Link>
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <div className="d-flex align-items-center">
              <FaC className="me-1" /> Import from Commons
            </div>
          </Link>
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <div className="d-flex align-items-center">
              <FaCrosshairs className="me-1" /> Choose Home Page
            </div>
          </Link>
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <div className="d-flex align-items-center">
              <FaChartBar className="me-1" /> View Course Stream
            </div>
          </Link>
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <div className="d-flex align-items-center">
              <FaBullhorn className="me-1" /> New Announcement
            </div>
          </Link>
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <div className="d-flex align-items-center">
              <FaChartBar className="me-1" /> New Analytics
            </div>
          </Link>
          <Link className="btn btn-block wd-button-standard text-start" to="#">
            <div className="d-flex align-items-center">
              <FaBell className="me-1" /> View Course Notifications
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CourseStatus;
