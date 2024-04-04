import { FaEllipsisV, FaPlus } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import MiddleContent from "../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import AssignmentList from "./List";
import { useNavigate, useParams } from "react-router";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { removeAssignment } from "./reducer";
import { useDispatch } from "react-redux";
import { deleteAssignment } from "./client";

function Assignments() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDeleteAssignmentModal, setShowDeleteAssignmentModal] =
    useState(false);
  const [deleteAssignmentName, setDeleteAssignmentName] = useState("");
  const [deleteAssignmentId, setDeleteAssignmentId] = useState("");

  const handleAddAssignmentButton = () => {
    navigate(`/Kanbas/Courses/${courseId}/Assignments/create`);
  };
  const handleDeleteAssignmentButton = async () => {
    if (deleteAssignmentId !== undefined && deleteAssignmentId !== "")
      deleteAssignment(deleteAssignmentId).then(() => {
        dispatch(removeAssignment(deleteAssignmentId));
        setShowDeleteAssignmentModal(false);
      });
  };

  return (
    <>
      <MiddleContent>
        <MiddleContentActions>
          <input
            className="form-control w-25 float-start"
            type="text"
            id="assignment-search-input"
            placeholder="Search for Assignment"
          />
          <Button className="wd-button-standard">
            <div className="d-flex justify-content-center align-items-center">
              <FaPlus className="me-1" /> Group
            </div>
          </Button>
          <Button className="wd-button-red" onClick={handleAddAssignmentButton}>
            <div className="d-flex justify-content-center align-items-center">
              <FaPlus className="me-1" /> Assignment
            </div>
          </Button>
          <Button className="wd-button-standard">
            <div className="d-flex justify-content-center align-items-center">
              <FaEllipsisV className="my-1" />
            </div>
          </Button>
        </MiddleContentActions>
        <hr />
        <MiddleContentData>
          <AssignmentList
            setShowDeleteAssignmentModal={setShowDeleteAssignmentModal}
            setDeleteAssignmentName={setDeleteAssignmentName}
            setDeleteAssignmentId={setDeleteAssignmentId}
          />
        </MiddleContentData>
      </MiddleContent>

      <Modal
        show={showDeleteAssignmentModal}
        onHide={() => setShowDeleteAssignmentModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the Assignment{" "}
          <b>{deleteAssignmentName}</b>? This action is not reversible, and you
          will loose all data inside this assignment!
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="wd-button-standard"
            onClick={() => setShowDeleteAssignmentModal(false)}
          >
            Close
          </Button>
          <Button
            className="wd-button-red"
            onClick={handleDeleteAssignmentButton}
          >
            Delete Assignment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Assignments;
