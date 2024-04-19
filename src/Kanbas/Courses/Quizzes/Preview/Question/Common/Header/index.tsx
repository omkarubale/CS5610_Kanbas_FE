import "./index.css";

function QuizQuestionHeader({ index, points }: { index: number, points: number }) {
    return (
        <div className="wd-quiz-question-header">
            <span className="wd-quiz-question-name">
                Question {index + 1}
            </span>
            <span className="wd-quiz-question-points">
                {points} pts
            </span>
        </div>
    )
}

export default QuizQuestionHeader; 