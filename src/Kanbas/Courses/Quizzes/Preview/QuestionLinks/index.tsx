import { Button } from "react-bootstrap";
import { MdOutlineEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { GoQuestion } from "react-icons/go";
import "./index.css";
import { useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { IKanbasQuizQuestion } from "../../../../store/interfaces/quizzes";
import { Key, useState } from "react";
import { FaFlag } from "react-icons/fa";

function QuizPreviewQuestionLinks({ scrollToQuestion }:
    { scrollToQuestion: any }) {

    const { courseId, quizId } = useParams();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const flaggedQuestions = useSelector(
        (state: KanbasState) => state.quizzesReducer.flaggedQuestions
    );

    const questions: IKanbasQuizQuestion[] = useSelector(
        (state: KanbasState) => state.quizzesReducer.quizQuestions
    );

    const handleQuestionClick = (index: any) => {
        setSelectedIndex(index);
        scrollToQuestion(index);
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
            <ul className="list-group wd-questions">
                {questions?.map((question: any, index: number) => (
                    <li
                        className={`list-group-item ${index === selectedIndex ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleQuestionClick(index)}>
                        {/* TODO need to handle different links based on how questions are rendered */}
                        {flaggedQuestions[index] && <FaFlag className="flag-icon" />}
                        <Link to="" ></Link>
                        <GoQuestion className="mb-1 me-1" color="#595959" />
                        Question {index + 1}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default QuizPreviewQuestionLinks; 