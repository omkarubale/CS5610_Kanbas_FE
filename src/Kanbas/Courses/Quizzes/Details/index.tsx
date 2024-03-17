import MiddleContent from "../../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import QuizEditor from "../Editor";

function QuizDetails() {
    return (
        <>
            <MiddleContent>
                <MiddleContentActions>
                    <QuizEditor />
                </MiddleContentActions>
                <MiddleContentData>
                    <></>
                </MiddleContentData>
            </MiddleContent>
        </>
    );
}

export default QuizDetails;