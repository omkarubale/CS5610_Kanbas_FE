import { IKanbasQuizQuestion } from "../../../../store/interfaces/quizzes";
import { FaFlag } from "react-icons/fa";
import QuizQuestionHeader from "./Common/Header";
import MultipleChoice from "./Common/MultipleChoice";
import { eQuizQuestionType } from "../../../../store/enums/eQuizQuestionType";
import ShortAnswers from "./Common/ShortAnswers";
import "./index.css";

function QuizQuestion({
  question,
  index,
  isQuestionFlagged,
  handleFlagClick,
}: {
  question: IKanbasQuizQuestion;
  index: number;
  isQuestionFlagged: boolean;
  handleFlagClick: (index: number) => void;
}) {
  return (
    <div
      key={index}
      id={`question-${index}`}
      className="wd-quiz-question-holder"
    >
      <div>
        <button
          className="wd-quiz-flag-question"
          onClick={() => handleFlagClick(index)}
        >
          <FaFlag
            className={
              isQuestionFlagged
                ? "wd-quiz-flagged-icon"
                : "wd-quiz-default-icon"
            }
          />
        </button>
      </div>
      {(question.quizQuestionType === eQuizQuestionType.MCQ ||
        question.quizQuestionType === eQuizQuestionType.TrueOrFalse) && (
        <div className="wd-quiz-question multiple-choice-question">
          <QuizQuestionHeader
            questionTitle={`Question ${index + 1}`}
            points={question.points}
          />
          <MultipleChoice question={question} />
        </div>
      )}

      {question.quizQuestionType === eQuizQuestionType.FillInTheBlank && (
        <div className="wd-quiz-question short-answer-question">
          <QuizQuestionHeader
            questionTitle={`Question ${index + 1}`}
            points={question.points}
          />
          <ShortAnswers question={question} />
        </div>
      )}
    </div>
  );
}

export default QuizQuestion;
