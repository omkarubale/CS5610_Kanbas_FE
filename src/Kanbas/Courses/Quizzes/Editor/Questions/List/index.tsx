import { useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";

function QuizQuestionList() {
  const quizQuestions = useSelector(
    (state: KanbasState) => state.quizQuestionsReducer.questions
  );
  return <></>;
}

export default QuizQuestionList;
