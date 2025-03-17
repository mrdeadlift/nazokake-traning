import { getQuizById } from "../../utils/quizUtils";
import ResultClient from "./ResultClient";

// サーバーコンポーネント
export default function ResultPage({ params }: { params: { id: string } }) {
  const quizId = params.id;
  const quiz = getQuizById(quizId);
  
  return <ResultClient quiz={quiz || null} quizId={quizId} />;
} 