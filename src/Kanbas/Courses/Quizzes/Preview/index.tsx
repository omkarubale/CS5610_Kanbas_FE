import MiddleContent from "../../../layout/Content/NotLeftSide/MiddleContent";
import RightSide from "../../../layout/Content/NotLeftSide/RightSide";
import QuizPreviewQuestionLinks from "./QuestionLinks";
import QuizQuestionPreviewSingle from "./Question/Single";
import QuizQuestionPreviewList from "./Question/List";
import MiddleContentActions from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";

function QuizPreview() {

    // TODO this variable will be removed later to use props directly from JSON
    const isQneQuestionAtATime = false;

    return (
        <>
            <MiddleContent>
                <MiddleContentActions>
                    <></>
                </MiddleContentActions>
                <hr />
                <MiddleContentData>
                    {isQneQuestionAtATime && QuizQuestionPreviewSingle}
                    {isQneQuestionAtATime && QuizQuestionPreviewList}
                </MiddleContentData>
            </MiddleContent>
            <RightSide>
                <QuizPreviewQuestionLinks />
            </RightSide>
        </>
    );
}

export default QuizPreview; 