import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../store";
import {
  setCourse,
  addCourse,
  deleteCourse,
  updateCourse,
} from "../Courses/reducer";
import Form from "react-bootstrap/Form";
import { FaCaretDown } from "react-icons/fa";

function Dashboard() {
  const courses = useSelector(
    (state: KanbasState) => state.coursesReducer.courses
  );
  const course = useSelector(
    (state: KanbasState) => state.coursesReducer.course
  );
  const dispatch = useDispatch();
  const [addCourseDrawerOpen, setAddCourseDrawerOpen] = useState(false);

  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <h2>
        Add Course
        <FaCaretDown
          onClick={() => setAddCourseDrawerOpen(!addCourseDrawerOpen)}
          aria-controls="add-module-drawer-controls"
          aria-expanded={addCourseDrawerOpen}
          style={{ transform: addCourseDrawerOpen ? "" : "rotate(-90deg)" }}
        />
      </h2>
      <Collapse in={addCourseDrawerOpen}>
        <div>
          <Card className="p-3 mb-3 rounded-0">
            <Form>
              <div className="row">
                <Form.Group className="mb-3 col-md col-sm-12">
                  <Form.Control
                    value={course.name}
                    type="text"
                    onChange={(e) =>
                      dispatch(setCourse({ ...course, name: e.target.value }))
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md col-sm-12">
                  <Form.Control
                    value={course.number}
                    type="text"
                    onChange={(e) =>
                      dispatch(setCourse({ ...course, number: e.target.value }))
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md col-sm-12">
                  <Form.Control
                    value={course.startDate}
                    type="date"
                    onChange={(e) =>
                      dispatch(
                        setCourse({ ...course, startDate: e.target.value })
                      )
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md col-sm-12">
                  <Form.Control
                    value={course.endDate}
                    type="date"
                    onChange={(e) =>
                      dispatch(
                        setCourse({ ...course, endDate: e.target.value })
                      )
                    }
                  />
                </Form.Group>
                <Form.Group className="d-inline-flex">
                  <Button
                    className="wd-button-standard ms-auto"
                    onClick={(e) => dispatch(addCourse())}
                  >
                    Add
                  </Button>
                  <Button
                    className="wd-button-standard"
                    onClick={(e) => dispatch(updateCourse())}
                  >
                    Update
                  </Button>
                </Form.Group>
              </div>
            </Form>
          </Card>
        </div>
      </Collapse>
      <hr />
      <h2>Published Courses (12)</h2>
      <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card">
                <img
                  src={`/assets/images/${course.image}`}
                  className="card-img-top"
                  style={{ height: 150 }}
                  alt="N"
                />
                <div className="card-body">
                  <Link
                    className="card-title"
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    {course.name}
                  </Link>
                  <p className="card-text">{course.name}</p>
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="btn btn-primary wd-button-standard"
                  >
                    Go
                  </Link>
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(setCourse(course));
                    }}
                    className="btn btn-primary wd-button-standard"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(deleteCourse(course._id));
                    }}
                    className="btn btn-primary wd-button-red"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
