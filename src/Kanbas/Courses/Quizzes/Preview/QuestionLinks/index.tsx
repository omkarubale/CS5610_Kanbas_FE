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
import { useRef } from "react";
import { updateLastSavedTime } from "../reducer";

function QuizPreviewQuestionLinks() {

    const { courseId, quizId } = useParams();
    const dispatch = useDispatch();
    const questionRefs = useRef<(HTMLElement | null)[]>([]);

    const flaggedQuestions = useSelector(
        (state: KanbasState) => state.quizPreviewReducer.flaggedQuestions
    );

    const questions: IKanbasQuizQuestion[] = useSelector(
        (state: KanbasState) => state.quizzesReducer.quizQuestions
    );

    const currentQuestionIndex = useSelector(
        (state: KanbasState) => state.quizzesReducer.currentQuestionIndex
    );

    const scrollToQuestionIndex = useSelector(
        (state: KanbasState) => state.quizPreviewReducer.scrollToQuestion
    )

    const scrollToQuestion = (index: number) => {
        const questionRef = questionRefs.current[index];
        questionRef?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleQuestionClick = (index: any) => {
        dispatch(setActiveQuestion(index));
        dispatch(updateLastSavedTime(new Date()));

        if (scrollToQuestionIndex !== undefined) {
            scrollToQuestion(scrollToQuestionIndex);
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