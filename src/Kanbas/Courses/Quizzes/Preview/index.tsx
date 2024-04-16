import MiddleContent from "../../../layout/Content/NotLeftSide/MiddleContent";
import RightSide from "../../../layout/Content/NotLeftSide/RightSide";
import QuizPreviewQuestionLinks from "./QuestionLinks";
import QuizQuestionPreviewSingle from "./Question/Single";
import QuizQuestionPreviewList from "./Question/List";
import MiddleContentActions from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { Button, Form } from "react-bootstrap";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import { IKanbasQuizQuestion } from "../../../store/interfaces/quizzes";
import { useParams } from "react-router";
import { getQuizQuestions } from "../client";
import { resetPreview, setQuizQuestions } from "../reducer";
import { getCurrentHumanReadableDate } from "../../common/Utils";

function QuizPreview() {

    const { quizId } = useParams();
    const dispatch = useDispatch();
    const questionRefs = useRef<(HTMLElement | null)[]>([]);

    const [lastSavedTime, setLastSavedTime] = useState(new Date());

    const quizDetails = useSelector(
        (state: KanbasState) => state.quizzesReducer.quiz
    );

    const scrollToQuestion = (index: number) => {
        const questionRef = questionRefs.current[index];
        questionRef?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleSubmit = () => {
    }

    useEffect(() => {
        if (quizId !== undefined) {
            getQuizQuestions(quizId).then((questions: IKanbasQuizQuestion[]) => {
                dispatch(setQuizQuestions(questions));
                dispatch(resetPreview());
            });
        };
    }, [dispatch]);

    useEffect(() => {
        const id = setInterval(() => {
            setLastSavedTime(new Date());
        }, 1000); // update every second

        return () => clearInterval(id);
    }, [])

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
                        Started: {getCurrentHumanReadableDate(new Date())}
                    </div>
                    <div className="d-flex justify-content-start">
                        <h3 className="fw-bold">Quiz Instructions</h3>
                    </div>
                </MiddleContentActions>
                <hr />
                <MiddleContentData>
                    <Form>
                        {quizDetails?.isOneQuestionAtATime
                            ? <QuizQuestionPreviewSingle />
                            : <QuizQuestionPreviewList questionRefs={questionRefs} />}

                        <div className="form-actions mb-5">
                            <span className="pe-3">Quiz saved at {getCurrentHumanReadableDate(lastSavedTime)}</span>
                            <Button type="submit" className="wd-button-standard" onClick={() => handleSubmit()}>
                                Submit Quiz
                            </Button>
                        </div>
                    </Form>
                </MiddleContentData>
            </MiddleContent>
            <RightSide>
                {quizDetails?.isOneQuestionAtATime
                    ? <QuizPreviewQuestionLinks />
                    : <QuizPreviewQuestionLinks scrollToQuestion={scrollToQuestion} />
                }
            </RightSide>
        </>
    );
}

export default QuizPreview; 