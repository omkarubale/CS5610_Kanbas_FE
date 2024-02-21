import { FaCircle, FaRegCheckCircle, FaTimes } from "react-icons/fa";
import "./index.css";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

function HomeTodo() {
  return (
    <div className="wd-home-todo">
      <h2>To Do</h2>
      <ul className="list-group">
        <li className="list-group-item d-inline-flex">
          <div className="wd-todo-badge">
            <Badge pill bg="danger">
              1
            </Badge>
          </div>
          <div className="wd-todo-details">
            <Link to="#" className="wd-todo-link">
              Grade Assignment
            </Link>
            <p className="wd-todo-sub-details">
              100 Points <FaCircle size={6} /> Oct 2 at 11.59PM
            </p>
          </div>
          <div className="wd-todo-close">
            <Button className="d-contents bg-transparent px-1 py-0 me-0 border-0">
              <FaTimes />
            </Button>
          </div>
        </li>
        <li className="list-group-item d-inline-flex">
          <div className="wd-todo-badge">
            <Badge pill bg="danger">
              2
            </Badge>
          </div>
          <div className="wd-todo-details">
            <Link to="#" className="wd-todo-link">
              Grade Assignment
            </Link>
            <p className="wd-todo-sub-details">
              100 Points <FaCircle size={6} /> Oct 8 at 11.59PM
            </p>
          </div>
          <div className="wd-todo-close">
            <Button className="d-contents bg-transparent px-1 py-0 me-0 border-0">
              <FaTimes />
            </Button>
          </div>
        </li>
        <li className="list-group-item d-inline-flex">
          <div className="wd-todo-badge">
            <Badge pill bg="danger">
              3
            </Badge>
          </div>
          <div className="wd-todo-details">
            <Link to="#" className="wd-todo-link">
              Grade Assignment
            </Link>
            <p className="wd-todo-sub-details">
              100 Points <FaCircle size={6} /> Oct 14 at 11.59PM
            </p>
          </div>
          <div className="wd-todo-close">
            <Button className="d-contents bg-transparent px-1 py-0 me-0 border-0">
              <FaTimes />
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default HomeTodo;
