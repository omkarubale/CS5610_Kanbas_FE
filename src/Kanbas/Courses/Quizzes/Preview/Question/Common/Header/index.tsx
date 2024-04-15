import "./index.css";

function QuizQuestionHeader({ index, points }: { index: number, points: number }) {
    return (
        <div className="header">
            <span className="question-name">
                Question {index + 1}
            </span>
            <span className="question-points">
                {points} pts
            </span>
        </div>
    )
}

export default QuizQuestionHeader; 