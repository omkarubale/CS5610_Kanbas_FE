import { FaCalendarAlt } from "react-icons/fa";
import "./index.css";

function ComingUp() {
  return (
    <div className="wd-coming-up">
      <h2>
        Comming Up
        <div className="wd-h2-link">
          <FaCalendarAlt className="me-1" />
          <a href="#">View Calendar</a>
        </div>
      </h2>
      <ul className="list-group">
        <li className="list-group-item d-inline-flex">
          <div className="wd-event-icon">
            <FaCalendarAlt />
          </div>
          <div className="wd-event-details">
            <a href="#" className="wd-event-link">
              Lecture CS4550.12631.202410
            </a>
            <p className="wd-event-time">Sept 7 at 11:45am</p>
          </div>
        </li>
        <li className="list-group-item d-inline-flex">
          <div className="wd-event-icon">
            <FaCalendarAlt />
          </div>
          <div className="wd-event-details">
            <a href="#" className="wd-event-link">
              Lecture CS4550.12631.202410
            </a>
            <p className="wd-event-time">Sept 11 at 11:45am</p>
          </div>
        </li>
        <li className="list-group-item d-inline-flex">
          <div className="wd-event-icon">
            <FaCalendarAlt />
          </div>
          <div className="wd-event-details">
            <a href="#" className="wd-event-link">
              CS5610 06 SP23 Lecture
            </a>
            <p className="wd-event-time">Sept 11 at 6pm</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ComingUp;
