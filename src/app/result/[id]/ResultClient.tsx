"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { NazokakeQuiz, QuizMode } from "../../types";

interface ResultClientProps {
  quiz: NazokakeQuiz | null;
  quizId: string;
}

export default function ResultClient({ quiz, quizId }: ResultClientProps) {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") as QuizMode || "organized";
  const userAnswer = searchParams.get("answer") || "";
  
  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">クイズが見つかりません</h1>
          <Link 
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  const isCorrect = mode === "organized" 
    ? userAnswer.includes(quiz.answer)
    : userAnswer.includes(quiz.firstThing) && userAnswer.includes(quiz.secondThing);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <Link 
          href="/"
          className="inline-block mb-6 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← ホームに戻る
        </Link>

        <h1 className="text-2xl font-bold mb-6 text-center">
          {isCorrect ? "正解！" : "不正解..."}
        </h1>
        
        <div className="mb-6">
          <h2 className="font-bold mb-2">あなたの回答：</h2>
          <p className="p-3 bg-gray-100 dark:bg-gray-700 rounded">{userAnswer}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="font-bold mb-2">正解：</h2>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-900">
            {mode === "organized" ? (
              <p>その心はどちらも「{quiz.answer}」でしょう</p>
            ) : (
              <>
                <p className="mb-1">「{quiz.firstThing}」とかけまして</p>
                <p>「{quiz.secondThing}」と解く</p>
              </>
            )}
          </div>
        </div>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-900">
          <h2 className="font-bold mb-2">解説：</h2>
          <p>
            「{quiz.firstThing}」と「{quiz.secondThing}」は、
            どちらも「{quiz.answer}」という共通点があります。
          </p>
        </div>
        
        <div className="flex gap-4">
          <Link 
            href="/"
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
          >
            ホームに戻る
          </Link>
          
          <Link 
            href={`/quiz/${getRandomQuizId(quizId)}?mode=${mode}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
          >
            次のクイズ
          </Link>
        </div>
      </div>
    </div>
  );
}

// 現在のクイズIDと異なるランダムなクイズIDを取得する関数
function getRandomQuizId(currentId: string): string {
  // 1から50までのIDを生成
  const allIds = Array.from({ length: 50 }, (_, i) => String(i + 1));
  const availableIds = allIds.filter(id => id !== currentId);
  const randomIndex = Math.floor(Math.random() * availableIds.length);
  return availableIds[randomIndex];
} 