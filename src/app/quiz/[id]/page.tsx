import { getQuizById } from "../../utils/quizUtils";
import QuizClient from "@/app/quiz/[id]/QuizClient";

// サーバーコンポーネント
export default function QuizPage({ params }: { params: { id: string } }) {
  const quizId = params.id;
  const quiz = getQuizById(quizId);
  
  // クイズが見つからない場合はクライアントサイドで処理
  if (!quiz) {
    return <QuizClient quiz={null} quizId={quizId} />;
  }
  
  return <QuizClient quiz={quiz} quizId={quizId} />;
} 