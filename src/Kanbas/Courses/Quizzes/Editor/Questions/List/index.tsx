import { useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";
import QuizQuestionHeader from "../../../Preview/Question/Common/Header";
import "./index.css";

function QuizQuestionList() {
  const quizQuestions = useSelector(
    (state: KanbasState) => state.quizQuestionsReducer.questions
  );
  return (
    <>
      <div>
        {quizQuestions.map((quizQuestion, index) => (
          <div
            key={index}
            id={`quiz-question-${index}`}
            className="wd-quiz-question-container"
          >
            <div className="wd-quiz-question">
              <QuizQuestionHeader
                questionTitle={quizQuestion.title}
                points={quizQuestion.points}
              />
              <div className="wd-quiz-question-text">
                {quizQuestion.questionText}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default QuizQuestionList;
