import React, { useState } from "react";
function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [module, setModule] = useState({
    id: 1,
    name: "NodeJS Module",
    description: "Create a NodeJS server with ExpressJS",
    course: "RS101",
  });
  const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment";
  const MODULE_URL = "http://localhost:4000/a5/module";

  return (
    <div>
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a className="btn btn-primary" href="http://localhost:4000/a5/assignment">
        Get Assignment
      </a>
      <a className="btn btn-primary" href="http://localhost:4000/a5/module">
        Get Module
      </a>

      <h4>Retrieving Properties</h4>
      <a
        className="btn btn-primary"
        href="http://localhost:4000/a5/assignment/title"
      >
        Get Assignment Title
      </a>

      <a
        className="btn btn-primary"
        href="http://localhost:4000/a5/module/name"
      >
        Get Module Name
      </a>
      <h4>Modifying Properties</h4>
      <a
        className="btn btn-primary"
        href={`${ASSIGNMENT_URL}/title/${assignment.title}`}
      >
        Update Assignment Title
      </a>
      <input
        className="form-control"
        type="text"
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        value={assignment.title}
      />

      <a
        className="btn btn-primary"
        href={`${ASSIGNMENT_URL}/score/${assignment.score}`}
      >
        Update Assignment Score
      </a>
      <input
        className="form-control"
        type="number"
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
        value={assignment.score}
      />

      <a
        className="btn btn-primary"
        href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}
      >
        Update Assignment Completed
      </a>
      <div className="form-check">
        <input
          id="AssignmentCompleted"
          className="form-check-input"
          type="checkbox"
          onChange={(e) =>
            setAssignment({
              ...assignment,
              completed: e.target.checked,
            })
          }
          checked={assignment.completed}
        />
        <label htmlFor="AssignmentCompleted" className="form-check-label">
          Assignment Completed
        </label>
      </div>

      <a className="btn btn-primary" href={`${MODULE_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      <input
        className="form-control"
        type="text"
        onChange={(e) => setModule({ ...module, name: e.target.value })}
        value={module.name}
      />

      <a
        className="btn btn-primary"
        href={`${MODULE_URL}/description/${module.description}`}
      >
        Update Module Description
      </a>
      <input
        className="form-control"
        type="text"
        onChange={(e) => setModule({ ...module, description: e.target.value })}
        value={module.description}
      />
    </div>
  );
}
export default WorkingWithObjects;
