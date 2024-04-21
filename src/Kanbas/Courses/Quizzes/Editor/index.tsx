import { FaBan, FaCheckCircle, FaEllipsisV, FaTimesCircle } from "react-icons/fa";
import MiddleContent from "../../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import QuizDetailsEditor from "./Details";
import QuizQuestionsEditor from "./Questions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import CustomTabs from "../../common/Tabs";
import { ITabs } from "../../../store/interfaces/tabs";

function QuizEditor({ isCreate }: { isCreate: boolean }) {

    const quizDetails = useSelector(
        (state: KanbasState) => state.quizzesReducer.quiz
    );

    const tabs: ITabs[] = [
        { eventKey: "Details", title: "Details", component: <QuizDetailsEditor isCreate={isCreate} /> },
        { eventKey: "Questions", title: "Questions", component: <QuizQuestionsEditor /> }
    ];

    return (
        <>
            <MiddleContent>
                <MiddleContentActions>
                    <div className="d-inline-flex align-center">
                        <span className="fs-5">
                            Points {quizDetails.points}
                        </span>
                        <div>
                            {quizDetails.isPublished ? (
                                <div className="text-success ms-2 p-1">
                                    <FaCheckCircle className="pe-1 fs-5" />
                                    <span className="fw-bold pe-1">Published</span>
                                </div>
                            ) : (
                                <div className="text-muted ms-2 p-1 opacity-50">
                                    <FaBan className="pe-1 fs-5 mb-1" />
                                    <span className="fw-bold pe-1">Not Published</span>
                                </div>
                            )}
                        </div>

                        < Button className="wd-button-standard me-0">
                            <div className="d-flex justify-content-center align-items-center">
                                <FaEllipsisV className="my-1" />
                            </div>
                        </Button>
                    </div>
                </MiddleContentActions>
                <hr />
                <MiddleContentData>
                    <CustomTabs tabs={tabs} />
                </MiddleContentData>
            </MiddleContent >
        </>
    );
}

export default QuizEditor; 
