import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import QuizQuestionList from "./List";
import { useNavigate, useParams } from "react-router";

function QuizQuestionsEditor() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // TODO pass in the quiz object later and update the path
    const handleCreateQuestion = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/quizId/questions/create`);
    }

    return (
        <>
            <QuizQuestionList />

            <Button className="wd-button-red" onClick={() => handleCreateQuestion()}>
                <div className="d-flex justify-content-center align-items-center">
                    <FaPlus className="me-1" /> Edit
                </div>
            </Button>
            <div></div>
        </>
    );
}

export default QuizQuestionsEditor; 