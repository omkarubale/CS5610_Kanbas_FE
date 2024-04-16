import { IKanbasQuizQuestion } from "../../../../../store/interfaces/quizzes";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleFlagQuestion } from "../../../reducer";
import { KanbasState } from "../../../../../store";
import QuizQuestion from "..";

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
                    <QuizQuestion
                        key={index}
                        question={question}
                        index={index}
                        flaggedQuestions={flaggedQuestions}
                        handleFlagClick={handleFlagClick}
                        setRef={setQuestionRef}
                    />
                ))}
            </div>
        </>
    );
}

export default QuizQuestionPreviewList; 