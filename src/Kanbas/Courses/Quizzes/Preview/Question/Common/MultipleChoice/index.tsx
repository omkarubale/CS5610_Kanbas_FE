import { eQuizQuestionType } from "../../../../../../store/enums/eQuizQuestionType";
import { eTrueOrFalse } from "../../../../../../store/enums/eTrueOrFalse";
import "./index.css";

function MultipleChoice({ question }: { question: any }) {

    const renderAnswerOptions = () => {
        if (question.quizQuestionType === eQuizQuestionType.MCQ) {
            return renderChoices(question.choices);
        } else if (question.quizQuestionType === eQuizQuestionType.TrueOrFalse) {
            const eTrueOrFalseTypes = Object.keys(eTrueOrFalse).filter((key) => isNaN(Number(key)));
            return renderChoices(eTrueOrFalseTypes.map((key: string) => ({ choiceText: key })));
        } else {
            return null;
        }
    };

    const renderChoices = (choices: any[]) => {
        return (
            <>
                {
                    choices.map((choice: any, index: number) => (
                        <div className="answer" key={index}>
                            <label className="d-flex justify-content-start">
                                <span className="answer-input">
                                    <input
                                        type="radio"
                                        name={`question_${question._id}`}
                                        value={choice.choiceText}
                                    ></input>
                                </span>
                                <div className="answer-label ps-2">
                                    <p>{choice.choiceText}</p>
                                </div>
                            </label>
                        </div>
                    ))
                }
            </>
        );
    };

    return (
        <div className="text">
            <div className="question-text">
                <p>{question.questionText}</p>
            </div>
            <div className="answers">
                {renderAnswerOptions()}
            </div>
        </div>
    );
}

export default MultipleChoice;