import { IKanbasQuizQuestion } from "../../../../../store/interfaces/quizzes";

function QuizQuestionEditor({
  quizQuestion,
}: {
  quizQuestion: IKanbasQuizQuestion;
}) {
  return <>{quizQuestion.title}</>;
}

export default QuizQuestionEditor;
