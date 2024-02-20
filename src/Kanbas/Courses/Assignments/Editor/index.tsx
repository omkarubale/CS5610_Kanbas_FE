import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import MiddleContent from "../../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import Button from "react-bootstrap/Button";
import { FaEllipsisV, FaPlus, FaCheckCircle } from "react-icons/fa";
import Form from "react-bootstrap/Form";

function AssignmentEditor() {
  const { assignmentId } = useParams();
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("Actually saving assignment TBD in later assignments");
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  return (
    <>
      <MiddleContent>
        <MiddleContentActions>
          <div className="d-inline-flex align-center text-success">
            <FaCheckCircle className="pe-1" />
            <span className="fw-bold pe-1">Published</span>
            <Button className="wd-button-standard me-0">
              <FaEllipsisV />
            </Button>
          </div>
        </MiddleContentActions>

        <hr />

        <MiddleContentData>
          <Form>
            <Form.Group className="mb-3" controlId="formAssignmentName">
              <Form.Label>Assignment Name</Form.Label>
              <Form.Control type="text" value={assignment?.title} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAssignmentDescription">
              <Form.Control
                as="textarea"
                rows={3}
                value="This is the assignment description."
              />
            </Form.Group>

            <div>
              <Form.Group className="row mb-3" controlId="formAssignmentPoints">
                <div className="col-3">
                  <Form.Label className="float-end mt-1">Points</Form.Label>
                </div>
                <div className="col-6 mr-auto">
                  <Form.Control type="number" value="100" />
                </div>
              </Form.Group>

              <Form.Group className="row mb-3" controlId="formAssignmentGroup">
                <div className="col-3">
                  <Form.Label className="float-end mt-1">
                    Assignment Group
                  </Form.Label>
                </div>
                <div className="col-6 mr-auto">
                  <Form.Select aria-label="Assignment Group">
                    <option selected>ASSIGNMENTS</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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
                  <Form.Select aria-label="Display Grade as">
                    <option selected>Percentage</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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
                        <Form.Control type="text" value="Everyone" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formAssignmentDueDate"
                      >
                        <Form.Label className="fw-bold">Due</Form.Label>
                        <Form.Control type="date" value="2021-01-01" />
                      </Form.Group>

                      <div className="mb-3 row">
                        <Form.Group
                          className="col-6 pe-1"
                          controlId="formAssignmentAvailableFromDate"
                        >
                          <Form.Label className="fw-bold">
                            Available From
                          </Form.Label>
                          <Form.Control type="date" value="2021-01-01" />
                        </Form.Group>
                        <Form.Group
                          className="col-6 ps-1"
                          controlId="formAssignmentAvailableUntilDate"
                        >
                          <Form.Label className="fw-bold">Until</Form.Label>
                          <Form.Control type="date" value="2021-01-01" />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="card-footer text-center">
                      <FaPlus /> Add
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
                <Link
                  className="btn wd-button-standard"
                  to={`/Kanbas/Courses/${courseId}/Assignments`}
                >
                  Cancel
                </Link>
                <Button className="btn wd-button-red" onClick={handleSave}>
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
