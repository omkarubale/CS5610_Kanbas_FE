import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";
import QuizQuestionHeader from "../../../Preview/Question/Common/Header";
import "./index.css";
import { useParams } from "react-router";
import { addQuestion, removeQuestion, setQuizQuestions } from "../reducer";
import { Button } from "react-bootstrap";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getQuizQuestions } from "../../../client";
import QuizQuestionEditor from "../Editor";
import { IKanbasQuizQuestion } from "../../../../../store/interfaces/quizzes";

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

  const isQuestionEditMode = (quizQuestionId: string) => {
    const quizEditMode = quizEditModes.find(
      (qem) => qem.quizQuestionId == quizQuestionId
    );
    if (quizEditMode === undefined) return false;
    return quizEditMode.isEditMode;
  };

  const setQuestionEditMode = (quizQuestionId: string, isEditMode: boolean) => {
    const editModes = quizEditModes.map((qem) => {
      if (qem.quizQuestionId === quizQuestionId) {
        return {
          isEditMode: isEditMode,
          quizQuestionId: quizQuestionId,
        } as IQuizQuestionEditMode;
      } else return qem;
    });
    setQuizEditModes(editModes);
  };

  const handleAddQuestion = () => {
    if (quizId !== undefined) dispatch(addQuestion(quizId));
  };

  const handleRemoveQuestion = (quizQuestion: IKanbasQuizQuestion) => {
    dispatch(removeQuestion(quizQuestion));
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
            {isQuestionEditMode(quizQuestion._id) ? (
              <QuizQuestionEditor
                quizQuestion={quizQuestion}
                setQuestionEditMode={setQuestionEditMode}
              />
            ) : (
              <div className="wd-quiz-question">
                <QuizQuestionHeader
                  questionTitle={quizQuestion.title}
                  points={quizQuestion.points}
                />
                <div className="wd-quiz-question-text d-flex">
                  <div className="flex-fill">{quizQuestion.questionText}</div>
                  <div className="ms-2">
                    <FaPen
                      onClick={() =>
                        setQuestionEditMode(quizQuestion._id, true)
                      }
                    />

                    <FaTrash
                      className="ms-1"
                      onClick={() => handleRemoveQuestion(quizQuestion)}
                    />
                  </div>
                </div>
              </div>
            )}
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
