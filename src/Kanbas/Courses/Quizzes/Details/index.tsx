import { Button } from "react-bootstrap";
import { MdOutlineEdit } from "react-icons/md";
import MiddleContent from "../../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import { useNavigate, useParams } from "react-router";

function QuizDetails() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // TODO pass in the quiz object later and update the path
    const handleQuizEditButton = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/quizId/edit`);
    }

    return (
        <>
            <MiddleContent>
                <MiddleContentActions>
                    <></>
                </MiddleContentActions>
                <MiddleContentData>
                    <Button className="wd-button-red" onClick={() => handleQuizEditButton()}>
                        <div className="d-flex justify-content-center align-items-center">
                            <MdOutlineEdit className="me-1" /> Edit
                        </div>
                    </Button>
                </MiddleContentData>
            </MiddleContent>
        </>
    );
}

export default QuizDetails;