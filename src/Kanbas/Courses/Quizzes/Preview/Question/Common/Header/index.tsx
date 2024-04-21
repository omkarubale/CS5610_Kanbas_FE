import "./index.css";

function QuizQuestionHeader({
  questionTitle,
  points,
}: {
  questionTitle: string;
  points: number;
}) {
  return (
    <div className="wd-quiz-question-header d-flex">
      <div className="wd-quiz-question-name flex-fill">{questionTitle}</div>
      <div className="wd-quiz-question-points">{points} pts</div>
    </div>
  );
}

export default QuizQuestionHeader;
