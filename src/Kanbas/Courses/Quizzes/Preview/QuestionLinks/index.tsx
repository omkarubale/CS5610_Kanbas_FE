import { Button } from "react-bootstrap";
import { MdOutlineEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { GoQuestion } from "react-icons/go";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { IKanbasQuizQuestion } from "../../../../store/interfaces/quizzes";
import { FaFlag } from "react-icons/fa";
import { setActiveQuestion } from "../../reducer";
import { setScrollToQuestion, updateLastSavedTime } from "../reducer";

function QuizPreviewQuestionLinks({ isScrollable }: { isScrollable: boolean }) {

    const { courseId, quizId } = useParams();
    const dispatch = useDispatch();

    const flaggedQuestions = useSelector(
        (state: KanbasState) => state.quizPreviewReducer.flaggedQuestions
    );

    const questions: IKanbasQuizQuestion[] = useSelector(
        (state: KanbasState) => state.quizzesReducer.quizQuestions
    );

    const currentQuestionIndex = useSelector(
        (state: KanbasState) => state.quizzesReducer.currentQuestionIndex
    );

    const questionRefs = useSelector(
        (state: KanbasState) => state.quizPreviewReducer.questionRefs
    );

    const scrollToQuestionIndex = useSelector(
        (state: KanbasState) => state.quizPreviewReducer.scrollToQuestion
    )

    const scrollToQuestion = (index: number) => {
        const questionId = questionRefs[index];
        const questionRef = document.getElementById(questionId);
        if (questionRef) {
            questionRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    const handleQuestionClick = (index: any) => {
        dispatch(setActiveQuestion(index));
        dispatch(setScrollToQuestion(index));
        dispatch(updateLastSavedTime(new Date()));

        if (isScrollable && questionRefs !== undefined) {
            scrollToQuestion(index);
        }
    }

    return (
        <>
            <Button className="wd-button-standard">
                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`} className="button-sidebar-wide">
                    <MdOutlineEdit />
                    Keep Editing This Quiz
                </Link>
            </Button>
            <br /><br />
            <h3>Questions</h3>
            <ul className="list-group wd-quiz-questions">
                {questions?.map((question: any, index: number) => (
                    <li
                        className={`list-group-item ${index === currentQuestionIndex ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleQuestionClick(index)}>
                        {flaggedQuestions[index] && <FaFlag className="wd-quiz-question-flag-icon" />}
                        <GoQuestion className="mb-1 me-1" color="#595959" />
                        Question {index + 1}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default QuizPreviewQuestionLinks; 