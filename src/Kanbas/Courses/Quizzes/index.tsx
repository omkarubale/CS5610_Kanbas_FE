import MiddleContent from "../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import QuizList from "./List";

function Quizzes() {
    return (
        <>
            <MiddleContent>
                <MiddleContentActions>
                    <></>
                </MiddleContentActions>
                <MiddleContentData>
                    <QuizList />
                </MiddleContentData>
            </MiddleContent>
        </>
    );
}

export default Quizzes; 