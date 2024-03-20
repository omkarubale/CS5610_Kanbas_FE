import QuizDetails from "../Details";
import { useNavigate, useParams } from "react-router";

function QuizList() {

    const courseId = useParams();
    const navigate = useNavigate();

    const handleQuizSelection = () => {
        // TODO pass quiz id later to this function and update the path to direct to QuizDetails
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/`);
    }

    return (
        <>
            {/* TODO - update this to pass the quiz id to this function for navigation */}
            <a onClick={() => handleQuizSelection()} />
        </>
    );
}

export default QuizList;