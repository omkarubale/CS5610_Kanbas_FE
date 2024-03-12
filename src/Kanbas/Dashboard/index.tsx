import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../store";
import {
  setCourse,
  addCourse,
  deleteCourse,
  updateCourse,
} from "../Courses/reducer";

function Dashboard() {
  const courses = useSelector(
    (state: KanbasState) => state.coursesReducer.courses
  );
  const course = useSelector(
    (state: KanbasState) => state.coursesReducer.course
  );
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <h5>Course</h5>
      <input
        value={course.name}
        className="form-control"
        onChange={(e) =>
          dispatch(setCourse({ ...course, name: e.target.value }))
        }
      />
      <input
        value={course.number}
        className="form-control"
        onChange={(e) =>
          dispatch(setCourse({ ...course, number: e.target.value }))
        }
      />
      <input
        value={course.startDate}
        className="form-control"
        type="date"
        onChange={(e) =>
          dispatch(setCourse({ ...course, startDate: e.target.value }))
        }
      />
      <input
        value={course.endDate}
        className="form-control"
        type="date"
        onChange={(e) =>
          dispatch(setCourse({ ...course, endDate: e.target.value }))
        }
      />

      <Button onClick={(e) => dispatch(addCourse())}>Add</Button>
      <Button onClick={(e) => dispatch(updateCourse())}>Update</Button>
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
                    className="btn btn-primary"
                  >
                    Go
                  </Link>
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(setCourse(course));
                    }}
                    className="btn btn-primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(deleteCourse(course._id));
                    }}
                    className="btn btn-primary"
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
