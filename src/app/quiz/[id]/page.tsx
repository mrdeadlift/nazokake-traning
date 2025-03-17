import { getQuizById } from "../../utils/quizUtils";
import QuizClient from "@/app/quiz/[id]/QuizClient";
import { use } from "react";

// サーバーコンポーネント
export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const quizId = resolvedParams.id;
  const quiz = getQuizById(quizId);
  
  // クイズが見つからない場合はクライアントサイドで処理
  if (!quiz) {
    return <QuizClient quiz={null} quizId={quizId} />;
  }
  
  return <QuizClient quiz={quiz} quizId={quizId} />;
} 