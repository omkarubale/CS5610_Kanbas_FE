import QuizQuestionEditor from "./Editor";
import QuizQuestionList from "./List";

function QuizQuestionsEditor() {
    return (
        <>
            <QuizQuestionList />

            {/* On a quiz question edit selection, call QuizQuestionEditor  */}
            <QuizQuestionEditor />
            <div></div>
        </>
    );
}

export default QuizQuestionsEditor; 