import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";
import QuizQuestionHeader from "../../../Preview/Question/Common/Header";
import "./index.css";
import { useParams } from "react-router";
import { addQuestion, setQuizQuestions } from "../reducer";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getQuizQuestions } from "../../../client";
import QuizQuestion from "../../../Preview/Question";

interface IQuizQuestionEditMode {
  quizQuestionId: string;
  isEditMode: boolean;
}

function QuizQuestionList() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();

  const quizQuestions = useSelector(
    (state: KanbasState) => state.quizQuestionsReducer.questions
  );
  const [quizEditModes, setQuizEditModes] = useState(
    [] as IQuizQuestionEditMode[]
  );

  const handleAddQuestion = () => {
    if (quizId !== undefined) dispatch(addQuestion(quizId));
  };

  useEffect(() => {
    if (quizId !== undefined) {
      getQuizQuestions(quizId).then((quizQuestions) => {
        dispatch(setQuizQuestions(quizQuestions));
        const editModes = quizQuestions.map((qq) => {
          return {
            quizQuestionId: qq._id,
            isEditMode: false,
          } as IQuizQuestionEditMode;
        });

        setQuizEditModes(editModes);
      });
    }
  }, [dispatch]);

  return (
    <>
      <div>
        {quizQuestions.map((quizQuestion, index) => (
          <div
            key={index}
            id={`quiz-question-${index}`}
            className="wd-quiz-question-container"
          >
            <div className="wd-quiz-question">
              <QuizQuestionHeader
                questionTitle={quizQuestion.title}
                points={quizQuestion.points}
              />
              <div className="wd-quiz-question-text">
                {quizQuestion.questionText}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Button
          className="wd-button-standard"
          onClick={() => handleAddQuestion()}
        >
          <div className="d-flex justify-content-center align-items-center">
            <FaPlus className="me-1" /> New Question
          </div>
        </Button>
      </div>
    </>
  );
}

export default QuizQuestionList;
