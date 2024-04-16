import { useEffect, useRef } from "react";
import { IKanbasQuizQuestion } from "../../../../store/interfaces/quizzes";
import { FaFlag } from "react-icons/fa";
import QuizQuestionHeader from "./Common/Header";
import MultipleChoice from "./Common/MultipleChoice";
import { eQuizQuestionType } from "../../../../store/enums/eQuizQuestionType";
import ShortAnswers from "./Common/ShortAnswers";
import "./index.css";

function QuizQuestion({
    question,
    index,
    flaggedQuestions,
    handleFlagClick,
    setRef }:
    {
        question: IKanbasQuizQuestion,
        index: number,
        flaggedQuestions: boolean[],
        handleFlagClick: (index: number) => void,
        setRef?: (index: number, ref: HTMLDivElement | null) => void
    }
) {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (setRef) {
            setRef(index, ref.current);
        }
    }, [index, ref, setRef])

    return (
        <div
            key={index}
            id={`question-${index}`}
            className="question-holder"
            ref={ref}
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
                    <ShortAnswers question={question} />
                </div>
            }

        </div>
    );
}

export default QuizQuestion; 