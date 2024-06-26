import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { removeQuiz } from "../../client";
import { deleteQuiz } from "../../reducer";
import { Button, Modal } from "react-bootstrap";

function DeleteQuizModal({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) {
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const dispatch = useDispatch();

  console.log(quiz);

  const handleDeleteQuizButton = async () => {
    if (quiz !== undefined) {
      await removeQuiz(quiz._id).then(() => {
        dispatch(deleteQuiz(quiz._id));
        setShow(false);
      });
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Are you sure you want to delete this quiz "{quiz.title}"?</label>
      </Modal.Body>
      <Modal.Footer>
        <Button className="wd-button-standard" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button
          className="wd-button-red"
          onClick={() => {
            handleDeleteQuizButton();
          }}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteQuizModal;
