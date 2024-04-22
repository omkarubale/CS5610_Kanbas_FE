import { Button, Form } from "react-bootstrap";
import {
  IKanbasQuizQuestion,
  IKanbasQuizQuestionBlank,
} from "../../../../../../store/interfaces/quizzes";
import { FaPlus } from "react-icons/fa6";

function QuizQuestionEditorBlankAnswers({
  quizQuestion,
  setQuizQuestion,
}: {
  quizQuestion: IKanbasQuizQuestion;
  setQuizQuestion: (quizQuestion: IKanbasQuizQuestion) => void;
}) {
  const blankQuestion = quizQuestion as IKanbasQuizQuestionBlank;
  return (
    <>
      <div>
        {blankQuestion.correctBlankAnswers.map((choice, index) => (
          <div className="mt-2 w-50" key={index}>
            <Form.Control
              type="text"
              name={`fillBlank_${blankQuestion._id}`}
              placeholder="Type your answer..."
              value={choice}
            />
          </div>
        ))}
      </div>
      <div className="d-flex">
        <Button className=" d-contents text-danger">
          <div className="ms-auto d-flex justify-content-center align-items-center">
            <FaPlus className="me-1" /> Add Another Answer
          </div>
        </Button>
      </div>
    </>
  );
}

export default QuizQuestionEditorBlankAnswers;
