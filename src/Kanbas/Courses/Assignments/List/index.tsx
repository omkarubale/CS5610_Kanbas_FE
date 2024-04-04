import { useEffect, useState } from "react";
import "./index.css";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlus,
  FaGripVertical,
  FaPen,
  FaTrash,
} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import { FaFilePen, FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";

import {
  IKanbasAssignment,
  IKanbasAssignmentSection,
} from "../../../store/interfaces/assignments";
import {
  getAssignmentSectionsForCourse,
  getAssignmentsForCourse,
} from "../client";
import { setAssignmentSections, setAssignments } from "../reducer";
import { ISectionExpanded } from "../../common/interfaces/sectionExpanded";
import { Collapse } from "react-bootstrap";

function AssignmentList(props: {
  setDeleteAssignmentName: (arg0: string) => void;
  setDeleteAssignmentId: (arg0: string) => void;
  setShowDeleteAssignmentModal: (arg0: boolean) => void;
}) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assignmentSectionsList = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignmentSections
  );
  const assignmentsList = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignments
  );

  const [assignmentSectionsExpandedList, setAssignmentSectionExpandedList] =
    useState([] as ISectionExpanded[]);

  useEffect(() => {
    if (courseId !== undefined) {
      getAssignmentsForCourse(courseId).then((assignments) => {
        dispatch(setAssignments(assignments));
      });
      getAssignmentSectionsForCourse(courseId).then((assignmentSections) => {
        dispatch(setAssignmentSections(assignmentSections));

        const _assignmentSectionsExpandedList = assignmentSections.map(
          (as: IKanbasAssignmentSection) => {
            const assignmentSectionExpanded: ISectionExpanded = {
              _id: as._id,
              expanded: false,
            };
            return assignmentSectionExpanded;
          }
        );

        setAssignmentSectionExpandedList(_assignmentSectionsExpandedList);
      });
    }
  }, [dispatch]);

  function handleAssignmentEditButton(assignment: IKanbasAssignment) {
    navigate(`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`);
  }

  function handleAssignmentDeleteButton(assignment: IKanbasAssignment) {
    props.setDeleteAssignmentName(assignment.title);
    props.setDeleteAssignmentId(assignment._id);
    props.setShowDeleteAssignmentModal(true);
  }

  const isAssignmentSectionExpanded = (assignmentSectionId: string) => {
    return (
      assignmentSectionsExpandedList.find((as) => as._id == assignmentSectionId)
        ?.expanded ?? false
    );
  };
  const toggleAssignmentSectionExpanded = (assignmentSectionId: string) => {
    const _expanded =
      assignmentSectionsExpandedList.find((as) => as._id == assignmentSectionId)
        ?.expanded ?? false;
    setAssignmentSectionExpandedList(
      assignmentSectionsExpandedList.map((as, index) => {
        if (as._id == assignmentSectionId) {
          const assignmentSectionExpanded: ISectionExpanded = {
            _id: as._id,
            expanded: !_expanded,
          };
          return assignmentSectionExpanded;
        } else {
          return as;
        }
      })
    );
  };

  return (
    <>
      <ul className="list-group wd-assignments-grid">
        {assignmentSectionsList.map((assignmentSection, index) => (
          <li key={index} className="list-group-item">
            <div
              className="wd-assignments-grid-section d-flex align-items-center"
              onClick={() =>
                toggleAssignmentSectionExpanded(assignmentSection._id)
              }
              aria-controls={
                "assignment-section-collapse-" + assignmentSection._id
              }
              aria-expanded={isAssignmentSectionExpanded(assignmentSection._id)}
            >
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

            <Collapse in={isAssignmentSectionExpanded(assignmentSection._id)}>
              <div
                id={"assignment-section-collapse-" + assignmentSection._id}
                className="wd-assignment-section-collapse"
              >
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
                            <Link to="#"> Multiple Modules</Link> | Not
                            Available yet
                          </p>
                        </div>
                        <span className="float-end wd-assignments-grid-content-actions d-flex align-items-center">
                          <Button
                            className="d-contents"
                            onClick={() => handleAssignmentEditButton(a)}
                          >
                            <FaPen className="me-2" />
                          </Button>
                          <Button
                            className="d-contents"
                            onClick={() => handleAssignmentDeleteButton(a)}
                          >
                            <FaTrash className="me-2" />
                          </Button>
                          <FaCheckCircle className="wd-icon-green" />
                          <FaEllipsisV className="ms-2" />
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </Collapse>
          </li>
        ))}
      </ul>
    </>
  );
}
export default AssignmentList;
