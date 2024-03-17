import MiddleContent from "../../../layout/Content/NotLeftSide/MiddleContent";
import RightSide from "../../../layout/Content/NotLeftSide/RightSide";
import QuizPreviewQuestionLinks from "./QuestionLinks";
import QuizQuestionPreviewSingle from "./Question/Single";
import QuizQuestionPreviewList from "./Question/List";

function QuizPreview() {

    // TODO this variable will be removed later to use props directly from JSON
    const isQneQuestionAtATime = false;

    return (
        <>
            <MiddleContent>
                {isQneQuestionAtATime && QuizQuestionPreviewSingle}
                {isQneQuestionAtATime && QuizQuestionPreviewList}
            </MiddleContent>
            <RightSide>
                <QuizPreviewQuestionLinks />
            </RightSide>
        </>
    );
}

export default QuizPreview(); 