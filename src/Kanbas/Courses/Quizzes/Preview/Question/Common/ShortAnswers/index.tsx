import { Form } from "react-bootstrap";
import "./index.css";
import parse from "html-react-parser";

function ShortAnswers({ question }: { question: any }) {
  return (
    <div className="wd-quiz-text">
      <div className="wd-quiz-question-text">
        <p>{parse(question.questionText)}</p>
      </div>
      <div className="wd-quiz-question-answers">
        {question.correctBlankAnswers.map((choice: String, index: number) => (
          <div className="wd-quiz-question-answer" key={index}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="d-flex justify-content-start">
                  <Form.Control type="text"></Form.Control>
                </Form.Label>
              </Form.Group>
            </Form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShortAnswers;
