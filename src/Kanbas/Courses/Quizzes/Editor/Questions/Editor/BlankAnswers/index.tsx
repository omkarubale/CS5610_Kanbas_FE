import { Button, Form } from "react-bootstrap";
import {
  IKanbasQuizQuestion,
  IKanbasQuizQuestionBlank,
} from "../../../../../../store/interfaces/quizzes";
import { FaPlus, FaTrash } from "react-icons/fa6";

function QuizQuestionEditorBlankAnswers({
  quizQuestion,
  setQuizQuestion,
}: {
  quizQuestion: IKanbasQuizQuestion;
  setQuizQuestion: (quizQuestion: IKanbasQuizQuestion) => void;
}) {
  const blankQuestion = quizQuestion as IKanbasQuizQuestionBlank;

  const handleChangeChoiceText = (index: number, text: string) => {
    const _correctBlankAnswers = blankQuestion.correctBlankAnswers.map(
      (cba, _index) => {
        if (index == _index) {
          return text;
        } else {
          return cba;
        }
      }
    );

    const _blankQuestion = {
      ...blankQuestion,
      correctBlankAnswers: _correctBlankAnswers,
    };
    setQuizQuestion(_blankQuestion);
  };

  const handleAddChoice = () => {
    const _correctBlankAnswers = [...blankQuestion.correctBlankAnswers];
    _correctBlankAnswers.push("");

    const _blankQuestion = {
      ...blankQuestion,
      correctBlankAnswers: _correctBlankAnswers,
    };
    setQuizQuestion(_blankQuestion);
  };

  const handleRemoveChoice = (index: number) => {
    const _correctBlankAnswers = blankQuestion.correctBlankAnswers.filter(
      (_, _index) => _index != index
    );
    const _blankQuestion = {
      ...blankQuestion,
      correctBlankAnswers: _correctBlankAnswers,
    };
    setQuizQuestion(_blankQuestion);
  };

  return (
    <>
      <div>
        {blankQuestion.correctBlankAnswers.map((choice, index) => (
          <div className="d-flex mt-2" key={index}>
            <Form.Control
              type="text"
              className="w-50"
              name={`fillBlank_${blankQuestion._id}`}
              placeholder="Type your answer..."
              value={choice}
              onChange={(e) => handleChangeChoiceText(index, e.target.value)}
            />
            <div className="d-flex justify-content-center align-items-center ms-2">
              <FaTrash onClick={() => handleRemoveChoice(index)} />
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex mt-2">
        <Button className=" d-contents text-danger" onClick={handleAddChoice}>
          <div className="d-flex justify-content-center align-items-center">
            <FaPlus className="me-2" /> Add Another Answer
          </div>
        </Button>
      </div>
    </>
  );
}

export default QuizQuestionEditorBlankAnswers;
