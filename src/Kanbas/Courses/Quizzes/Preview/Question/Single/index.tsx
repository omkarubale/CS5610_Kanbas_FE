import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";
import { IKanbasQuizQuestion } from "../../../../../store/interfaces/quizzes";
import { goToQuestion } from "../../../reducer";
import QuizQuestion from "..";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { toggleFlagQuestion, updateLastSavedTime } from "../../reducer";

function QuizQuestionPreviewSingle() {
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

    const handleFlagClick = (index: number) => {
        dispatch(toggleFlagQuestion(index));
        dispatch(updateLastSavedTime(new Date()));
    };

    const handleGoToQuestion = (index: number) => {
        dispatch(goToQuestion(index));
        dispatch(updateLastSavedTime(new Date()));
    }

    return (
        <>
            <div className="wd-quiz-assessing">
                <QuizQuestion
                    key={currentQuestionIndex}
                    question={questions[currentQuestionIndex]}
                    index={currentQuestionIndex}
                    isQuestionFlagged={flaggedQuestions[currentQuestionIndex]}
                    handleFlagClick={handleFlagClick}
                />
            </div>
            <div className="px-3 pb-5">
                <button
                    type="submit"
                    className="wd-button-standard float-start px-4 py-2"
                    onClick={() => handleGoToQuestion(-1)}
                    hidden={currentQuestionIndex === 0}>
                    <MdArrowLeft className="fs-4" />
                    Previous
                </button>
                <button
                    type="submit"
                    className="wd-button-standard float-end px-4 py-2"
                    onClick={() => handleGoToQuestion(1)}
                    hidden={currentQuestionIndex === questions.length - 1}>
                    Next
                    <MdArrowRight className="fs-4" />
                </button>
            </div>
        </>
    );
}

export default QuizQuestionPreviewSingle; 