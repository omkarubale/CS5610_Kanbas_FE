import { eQuizQuestionType } from "../../../../../../store/enums/eQuizQuestionType";
import { eBooleanChoices } from "../../../../../../store/enums/eBooleanChoices";
import "./index.css";
import parse from "html-react-parser";

function MultipleChoice({ question }: { question: any }) {
  const renderTrueFalseOptions = () => {
    const eTrueOrFalseTypes = Object.keys(eBooleanChoices).filter((key) =>
      isNaN(Number(key))
    );
    return renderChoices(
      eTrueOrFalseTypes.map((key: string) => ({ choiceText: key }))
    );
  };

  const renderAnswerOptions = () => {
    if (question.quizQuestionType === eQuizQuestionType.MCQ) {
      return renderChoices(question.answerChoices);
    } else if (question.quizQuestionType === eQuizQuestionType.TrueOrFalse) {
      return renderTrueFalseOptions();
    } else {
      return null;
    }
  };

  const renderChoices = (choices: any[]) => {
    return (
      <>
        {choices?.map((choice: any, index: number) => (
          <div className="wd-quiz-question-answer" key={index}>
            <label className="d-flex justify-content-start">
              <span className="wd-quiz-answer-input">
                <input
                  type="radio"
                  name={`question_${question._id}`}
                  value={choice.choiceText}
                ></input>
              </span>
              <div className="wd-quiz-answer-label ps-2">
                <p>{choice.choiceText}</p>
              </div>
            </label>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="wd-quiz-text">
      <div className="wd-quiz-question-text">
        <p>{parse(question.questionText)}</p>
      </div>
      <div className="wd-quiz-question-answers">{renderAnswerOptions()}</div>
    </div>
  );
}

export default MultipleChoice;
