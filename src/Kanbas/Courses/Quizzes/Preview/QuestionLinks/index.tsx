import { Button } from "react-bootstrap";
import { MdOutlineEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { GoQuestion } from "react-icons/go";
import "./index.css";
import { useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { IKanbasQuizQuestion } from "../../../../store/interfaces/quizzes";
import { useState } from "react";

function QuizPreviewQuestionLinks() {
    const { courseId, quizId } = useParams();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleQuestionClick = (index: number) => {
        setSelectedIndex(index);
    }

    const quizQuestions: IKanbasQuizQuestion[] = useSelector(
        (state: KanbasState) => state.quizzesReducer.quizQuestions
    );

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
                {quizQuestions?.map((question, index) => (
                    <li
                        className={`list-group-item ${index === selectedIndex ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleQuestionClick(index)}>
                        {/* TODO need to handle different links based on how questions are rendered */}
                        <Link to="" ></Link>
                        <GoQuestion className="mb-1 me-1" />
                        Question {index + 1}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default QuizPreviewQuestionLinks; 