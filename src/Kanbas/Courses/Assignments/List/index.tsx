import { useState } from "react";
import "./index.css";
import { assignments, assignmentSections } from "../../../Database";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlus,
  FaGripVertical,
} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { FaFilePen } from "react-icons/fa6";
import { Link } from "react-router-dom";

function AssignmentList() {
  const { courseId } = useParams();
  const assignmentSectionsList = assignmentSections.filter(
    (assignmentSection) => assignmentSection.course === courseId
  );
  const assignmentsList = assignments.filter(
    (assignment) => assignment.course === courseId
  );
  const [selectedSectionId, setSelectedSection] = useState(
    assignmentSectionsList[0]._id
  );

  return (
    <>
      <ul className="list-group wd-assignments-grid">
        {assignmentSectionsList.map((assignmentSection) => (
          <li
            className="list-group-item"
            onClick={() => setSelectedSection(assignmentSection._id)}
          >
            <div className="wd-assignments-grid-section d-flex align-items-center">
              <FaGripVertical className="me-2" />
              <div className="me-auto">{assignmentSection.title}</div>
              <span className="float-end wd-assignments-grid-content-actions d-flex align-items-center">
                <Button
                  type="button"
                  className="btn wd-button-standard btn-sm me-2 wd-assignment-weightage"
                >
                  {assignmentSection.weightage} of Total
                </Button>
                <FaCheckCircle className="wd-icon-green" />
                <FaPlus className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>

            {selectedSectionId === assignmentSection._id && (
              <ul className="list-group">
                {assignmentsList
                  ?.filter((a) => a.sectionId === assignmentSection._id)
                  ?.map((assignment) => (
                    <li className="list-group-item d-flex align-items-center">
                      <FaGripVertical className="me-2" />
                      <FaFilePen className="ms-2 wd-icon-green" />
                      <div className="wd-assignments-grid-content-text flex-fill me-auto">
                        <Link to={assignment._id} className="wd-event-link">
                          {assignment.title}
                        </Link>
                        <p className="wd-assignments-grid-content-details">
                          <Link to="#"> Multiple Modules</Link> | Not Available
                          yet
                        </p>
                      </div>
                      <span className="float-end wd-assignments-grid-content-actions d-flex align-items-center">
                        <FaCheckCircle className="wd-icon-green" />
                        <FaEllipsisV className="ms-2" />
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
export default AssignmentList;
