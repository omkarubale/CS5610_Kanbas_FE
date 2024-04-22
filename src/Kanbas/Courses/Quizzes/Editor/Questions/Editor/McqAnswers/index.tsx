import { Button, Form } from "react-bootstrap";
import {
  IKanbasQuizQuestion,
  IKanbasQuizQuestionMCQ,
} from "../../../../../../store/interfaces/quizzes";
import "./index.css";
import { FaPlus } from "react-icons/fa6";

function QuizQuestionEditorMcqAnswers({
  quizQuestion,
  setQuizQuestion,
}: {
  quizQuestion: IKanbasQuizQuestion;
  setQuizQuestion: (quizQuestion: IKanbasQuizQuestion) => void;
}) {
  const mcqQuestion = quizQuestion as IKanbasQuizQuestionMCQ;
  return (
    <>
      <div>
        {mcqQuestion.answerChoices.map((choice, index) => (
          <div className="d-flex mt-2" key={index}>
            <Form.Check
              className="wd-quiz-question-mcq-choice"
              type="radio"
              name={`mcq_${mcqQuestion._id}`}
            />
            <Form.Control
              className="ms-2 w-50"
              type="text"
              name={`mcq_text_${mcqQuestion._id}`}
              placeholder="Type your answer..."
              value={choice.choiceText}
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

export default QuizQuestionEditorMcqAnswers;
