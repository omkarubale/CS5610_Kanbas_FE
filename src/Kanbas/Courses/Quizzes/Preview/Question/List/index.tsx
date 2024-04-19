import { IKanbasQuizQuestion } from "../../../../../store/interfaces/quizzes";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";
import QuizQuestion from "..";
import { toggleFlagQuestion, updateLastSavedTime } from "../../reducer";

function QuizQuestionPreviewList() {

    const dispatch = useDispatch();

    const flaggedQuestions = useSelector(
        (state: KanbasState) => state.quizPreviewReducer.flaggedQuestions
    );

    const questions: IKanbasQuizQuestion[] = useSelector(
        (state: KanbasState) => state.quizzesReducer.quizQuestions
    );

    const handleFlagClick = (index: number) => {
        dispatch(toggleFlagQuestion(index));
        dispatch(updateLastSavedTime(new Date()));
    }

    return (
        <>
            <div className="wd-quiz-assessing">
                {questions?.map((question: any, index: number) => (
                    <QuizQuestion
                        key={index}
                        question={question}
                        index={index}
                        isQuestionFlagged={flaggedQuestions[index]}
                        handleFlagClick={handleFlagClick}
                    />
                ))}
            </div>
        </>
    );
}

export default QuizQuestionPreviewList; 