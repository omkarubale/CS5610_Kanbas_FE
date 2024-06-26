import { useNavigate, useParams } from "react-router-dom";
import MiddleContent from "../../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import Button from "react-bootstrap/Button";
import { FaEllipsisV, FaPlus, FaCheckCircle } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import {
  addAssignment,
  resetAssignment,
  setAssignment,
  setAssignmentEditSectionId,
  setAssignmentSections,
  updateAssignment,
} from "../reducer";
import { useEffect } from "react";
import {
  createAssignment,
  getAssignment,
  getCourseAssignmentSections,
  putAssignment,
} from "../client";
import {
  IKanbasAssignment,
  IKanbasAssignmentSection,
} from "../../../store/interfaces/assignments";

function AssignmentEditor({ isCreate }: { isCreate: boolean }) {
  const { courseId, assignmentId } = useParams();
  const assignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignment
  );
  const assignmentSections = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignmentSections
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    dispatch(resetAssignment());
  };

  const handleSave = async () => {
    if (courseId !== undefined) {
      if (isCreate) {
        createAssignment(courseId, assignment).then(
          (assignment: IKanbasAssignment) => {
            dispatch(addAssignment(assignment));
          }
        );
      } else {
        putAssignment(assignment).then(() => {
          dispatch(updateAssignment(assignment));
        });
      }
      handleCancel();
    }
  };

  useEffect(() => {
    dispatch(resetAssignment());
  }, [dispatch]);

  useEffect(() => {
    if (assignmentId !== undefined && courseId !== undefined) {
      getAssignment(assignmentId).then((assignment: IKanbasAssignment) => {
        dispatch(setAssignment(assignment));
      });
    }
  }, [dispatch, assignmentId, courseId]);

  useEffect(() => {
    if (assignmentSections.length === 0 && courseId !== undefined) {
      getCourseAssignmentSections(courseId).then(
        (assignmentSections: IKanbasAssignmentSection[]) => {
          dispatch(setAssignmentSections(assignmentSections));
        }
      );
    }
  });

  return (
    <>
      <MiddleContent>
        <MiddleContentActions>
          <div className="d-inline-flex align-center text-success">
            <FaCheckCircle className="pe-1" />
            <span className="fw-bold pe-1">Published</span>
            <Button className="wd-button-standard me-0">
              <div className="d-flex justify-content-center align-items-center">
                <FaEllipsisV className="my-1" />
              </div>
            </Button>
          </div>
        </MiddleContentActions>

        <hr />

        <MiddleContentData>
          <Form>
            <Form.Group className="mb-3" controlId="formAssignmentName">
              <Form.Label>Assignment Name</Form.Label>
              <Form.Control
                type="text"
                value={assignment?.title}
                onChange={(e) =>
                  dispatch(
                    setAssignment({ ...assignment, title: e.target.value })
                  )
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAssignmentDescription">
              <Form.Control
                as="textarea"
                rows={3}
                value={assignment?.description}
                onChange={(e) =>
                  dispatch(
                    setAssignment({
                      ...assignment,
                      description: e.target.value,
                    })
                  )
                }
              />
            </Form.Group>

            <div>
              <Form.Group className="row mb-3" controlId="formAssignmentPoints">
                <div className="col-3">
                  <Form.Label className="float-end mt-1">Points</Form.Label>
                </div>
                <div className="col-6 mr-auto">
                  <Form.Control
                    type="number"
                    value={assignment?.points}
                    onChange={(e) =>
                      dispatch(
                        setAssignment({ ...assignment, points: e.target.value })
                      )
                    }
                  />
                </div>
              </Form.Group>

              <Form.Group className="row mb-3" controlId="formAssignmentGroup">
                <div className="col-3">
                  <Form.Label className="float-end mt-1">
                    Assignment Group
                  </Form.Label>
                </div>
                <div className="col-6 mr-auto">
                  <Form.Select
                    aria-label="Assignment Group"
                    value={assignment.sectionId}
                    onChange={(e) =>
                      dispatch(setAssignmentEditSectionId(e.target.value))
                    }
                  >
                    {assignmentSections?.map((as, index) => (
                      <option key={index} value={as._id}>
                        {as.title}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group
                className="row mb-3"
                controlId="formAssignmentGradeDisplay"
              >
                <div className="col-3">
                  <Form.Label className="float-end mt-1">
                    Display Grade as
                  </Form.Label>
                </div>
                <div className="col-6 mr-auto">
                  <Form.Select aria-label="Display Grade as" value={0} disabled>
                    <option value="0">Percentage</option>
                  </Form.Select>
                </div>
              </Form.Group>

              <Form.Group
                className="row mb-3"
                controlId="formAssignmentAssignList"
              >
                <div className="col-3">
                  <Form.Label className="float-end mt-1">Assign</Form.Label>
                </div>
                <div className="col-6 mr-auto">
                  <div className="card">
                    <div className="card-body">
                      <Form.Group
                        className="mb-3"
                        controlId="formAssignmentAssignTo"
                      >
                        <Form.Label className="fw-bold">Assign to</Form.Label>
                        <Form.Control type="text" value="Everyone" disabled />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formAssignmentDueDate"
                      >
                        <Form.Label className="fw-bold">Due</Form.Label>
                        <Form.Control
                          type="date"
                          value={assignment?.dueDate}
                          onChange={(e) =>
                            dispatch(
                              setAssignment({
                                ...assignment,
                                dueDate: e.target.value,
                              })
                            )
                          }
                        />
                      </Form.Group>

                      <div className="mb-3 row">
                        <Form.Group
                          className="col-6 pe-1"
                          controlId="formAssignmentAvailableFromDate"
                        >
                          <Form.Label className="fw-bold">
                            Available From
                          </Form.Label>
                          <Form.Control
                            type="date"
                            value={assignment?.availableFromDate}
                            onChange={(e) =>
                              dispatch(
                                setAssignment({
                                  ...assignment,
                                  availableFromDate: e.target.value,
                                })
                              )
                            }
                          />
                        </Form.Group>
                        <Form.Group
                          className="col-6 ps-1"
                          controlId="formAssignmentAvailableUntilDate"
                        >
                          <Form.Label className="fw-bold">Until</Form.Label>
                          <Form.Control
                            type="date"
                            value={assignment?.availableToDate}
                            onChange={(e) =>
                              dispatch(
                                setAssignment({
                                  ...assignment,
                                  availableUntilDate: e.target.value,
                                })
                              )
                            }
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="card-footer text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <FaPlus className="me-1" /> Add
                      </div>
                    </div>
                  </div>
                </div>
              </Form.Group>
            </div>

            <hr />

            <div>
              <div className="form-check float-start mt-2">
                <Form.Check
                  type="checkbox"
                  label="Notify users that this content has changed"
                  id="formNotifyChangeCb"
                  className="ps-0"
                />
              </div>
              <div className="float-end">
                <Button className="wd-button-standard" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button className="wd-button-red" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </MiddleContentData>
      </MiddleContent>
    </>
  );
}

export default AssignmentEditor;
