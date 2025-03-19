import ResultClient from "./ResultClient";
import { use } from "react";

// サーバーコンポーネント
export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const quizId = resolvedParams.id;
  
  return <ResultClient quizId={quizId} />;
} 