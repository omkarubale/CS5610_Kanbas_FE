import MiddleContent from "../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import QuizList from "./List";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { Button } from "react-bootstrap";

function Quizzes() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleAddQuizButton = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/create`);
  };

  return (
    <>
      <MiddleContent>
        <MiddleContentActions>
          <input
            className="form-control w-25 float-start"
            type="text"
            id="quiz-search-input"
            placeholder="Search for Quiz"
          />
          <Button className="wd-button-red" onClick={handleAddQuizButton}>
            <div className="d-flex justify-content-center align-items-center">
              <FaPlus className="me-1" /> Quiz
            </div>
          </Button>
          <Button className="wd-button-standard">
            <div className="d-flex justify-content-center align-items-center">
              <FaEllipsisV className="my-1" />
            </div>
          </Button>
        </MiddleContentActions>
        <hr />
        <MiddleContentData>
          <QuizList />
        </MiddleContentData>
      </MiddleContent>
    </>
  );
}

export default Quizzes;
