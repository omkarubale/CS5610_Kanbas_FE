import MiddleContent from "../../../layout/Content/NotLeftSide/MiddleContent";
import RightSide from "../../../layout/Content/NotLeftSide/RightSide";
import QuizPreviewQuestionLinks from "./QuestionLinks";
import QuizQuestionPreviewSingle from "./Question/Single";
import QuizQuestionPreviewList from "./Question/List";
import MiddleContentActions from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { Button } from "react-bootstrap";
import "./index.css";

function QuizPreview() {

    const quizDetails = useSelector(
        (state: KanbasState) => state.quizzesReducer.quiz
    );

    const handleSubmit = () => {

    }


    return (
        <>
            <MiddleContent>
                <MiddleContentActions>
                    <div className="d-flex justify-content-start align-items-center">
                        <h2 className="fw-bold">{quizDetails?.title}</h2>
                    </div>
                    <div className="d-flex justify-content-start alert alert-danger" role="alert">
                        <IoAlertCircleOutline className="fs-4 mb-1" />
                        This is a preview of the published version of the quiz
                    </div>
                    <div className="d-flex justify-content-start">
                        Started:
                    </div>
                    <div className="d-flex justify-content-start">
                        <h3 className="fw-bold">Quiz Instructions</h3>
                    </div>
                </MiddleContentActions>
                <hr />
                <MiddleContentData>
                    {quizDetails?.isOneQuestionAtATime
                        ? <QuizQuestionPreviewSingle />
                        : <QuizQuestionPreviewList />}

                    <div className="form-actions">
                        <Button type="submit" className="wd-button-standard" onClick={() => handleSubmit()}>
                            Submit Quiz
                        </Button>
                    </div>
                </MiddleContentData>
            </MiddleContent>
            <RightSide>
                <QuizPreviewQuestionLinks />
            </RightSide>
        </>
    );
}

export default QuizPreview; 