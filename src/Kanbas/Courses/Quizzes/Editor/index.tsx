import MiddleContent from "../../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import QuizDetailsEditor from "./Details";
import QuizQuestionsEditor from "./Questions";

function QuizEditor() {
    return (
        <>
            <MiddleContent>
                <MiddleContentActions>
                    <></>
                </MiddleContentActions>
                <MiddleContentData>
                    <QuizDetailsEditor />
                    <QuizQuestionsEditor />
                </MiddleContentData>
            </MiddleContent>
        </>
    );
}

export default QuizEditor; 