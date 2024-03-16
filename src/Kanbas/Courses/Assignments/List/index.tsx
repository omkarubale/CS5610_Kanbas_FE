import { useEffect, useState } from "react";
import "./index.css";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlus,
  FaGripVertical,
  FaPen,
} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import { FaFilePen, FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { fetchAssignments } from "../reducer";
import { IKanbasAssignment } from "../../../store/interfaces/assignments";

function AssignmentList() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assignmentSectionsList = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignmentSections.filter(
      (a) => a.course == courseId
    )
  );
  const assignmentsList = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignments.filter((a) => a.courseId == courseId)
  );

  useEffect(() => {
    if (
      assignmentSectionsList.length === 0 &&
      assignmentsList.length === 0 &&
      courseId !== undefined
    )
      fetchAssignments(dispatch, courseId);
  }, [dispatch]);

  const [selectedSectionId, setSelectedSection] = useState("0");

  function handleAssignmentEditButton(assignment: IKanbasAssignment) {
    navigate(`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`);
  }

  return (
    <>
      <ul className="list-group wd-assignments-grid">
        {assignmentSectionsList.map((assignmentSection, index) => (
          <li
            key={index}
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
                  ?.map((a, aIndex) => (
                    <li
                      key={aIndex}
                      className="list-group-item d-flex align-items-center"
                    >
                      <FaGripVertical className="me-2" />
                      <FaFilePen className="ms-2 wd-icon-green" />
                      <div className="wd-assignments-grid-content-text flex-fill me-auto">
                        <a
                          onClick={() => handleAssignmentEditButton(a)}
                          className="wd-event-link"
                        >
                          {a.title}
                        </a>
                        <p className="wd-assignments-grid-content-details">
                          <Link to="#"> Multiple Modules</Link> | Not Available
                          yet
                        </p>
                      </div>
                      <span className="float-end wd-assignments-grid-content-actions d-flex align-items-center">
                        <Button
                          className="d-contents"
                          onClick={() => handleAssignmentEditButton(a)}
                        >
                          <FaPen className="me-2" />
                        </Button>
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
