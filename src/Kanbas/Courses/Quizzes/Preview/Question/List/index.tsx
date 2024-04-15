import { IKanbasQuizQuestion } from "../../../../../store/interfaces/quizzes";
import "./index.css";
import { eQuizQuestionType } from "../../../../../store/enums/eQuizQuestionType";
import QuizQuestionHeader from "../Common/Header";
import MultipleChoice from "../Common/MultipleChoice";
import ShortAnswer from "../Common/ShortAnswers";
import { useState } from "react";
import { FaFlag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleFlagQuestion } from "../../../reducer";
import Kanbas from "../../../../..";
import { KanbasState } from "../../../../../store";

function QuizQuestionPreviewList({ questionRefs }:
    { questionRefs: React.MutableRefObject<(HTMLElement | null)[]> }) {

    const dispatch = useDispatch();

    const flaggedQuestions = useSelector(
        (state: KanbasState) => state.quizzesReducer.flaggedQuestions
    );

    const questions: IKanbasQuizQuestion[] = useSelector(
        (state: KanbasState) => state.quizzesReducer.quizQuestions
    );

    const setQuestionRef = (index: number, ref: HTMLElement | null) => {
        questionRefs.current[index] = ref;
    };

    const handleFlagClick = (index: number) => {
        dispatch(toggleFlagQuestion(index));
    }

    return (
        <>
            <div className="assessing">
                {questions?.map((question: any, index: number) => (
                    <div
                        key={index}
                        className="question-holder"
                        ref={(ele) => setQuestionRef(index, ele)}
                    >
                        <div>
                            <button className="flag-question" onClick={() => handleFlagClick(index)}>
                                <FaFlag className={flaggedQuestions[index] ? 'flagged-icon' : 'default-icon'} />
                            </button>
                        </div>
                        {(question.quizQuestionType === eQuizQuestionType.MCQ || question.quizQuestionType === eQuizQuestionType.TrueOrFalse) &&
                            <div className="question multiple-choice-question">
                                <QuizQuestionHeader index={index} points={question.points} />
                                <MultipleChoice question={question} />
                            </div>
                        }

                        {question.quizQuestionType === eQuizQuestionType.FillInTheBlank &&
                            <div className="question short-answer-question">
                                <QuizQuestionHeader index={index} points={question.points} />
                                <ShortAnswer question={question} />
                            </div>
                        }

                    </div>
                ))}
            </div>
        </>
    );
}

export default QuizQuestionPreviewList; 