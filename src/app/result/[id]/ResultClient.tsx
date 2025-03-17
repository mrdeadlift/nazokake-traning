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
        <div className="washi-pattern japanese-border p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: '"HG行書体", "MS 明朝", serif' }}>クイズが見つかりません</h1>
          <Link 
            href="/"
            className="retro-button py-2 px-4 rounded-sm inline-block"
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
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="washi-pattern japanese-border p-8 max-w-md w-full">
        <Link 
          href="/"
          className="inline-block mb-6 text-accent-blue hover:underline"
        >
          ← ホームに戻る
        </Link>

        <div className="w-16 h-1 bg-accent-red mx-auto mb-6"></div>
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: '"HG行書体", "MS 明朝", serif' }}>
          {isCorrect ? "正解！" : "不正解..."}
        </h1>
        <div className="w-16 h-1 bg-accent-red mx-auto mb-6"></div>
        
        <div className="mb-6">
          <h2 className="font-bold mb-2 border-l-4 border-accent-blue pl-3">あなたの回答：</h2>
          <p className="p-3 bg-opacity-10 bg-accent-blue japanese-border">{userAnswer}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="font-bold mb-2 border-l-4 border-accent-green pl-3">正解：</h2>
          <div className="p-4 bg-opacity-10 bg-accent-green japanese-border">
            {mode === "organized" ? (
              <p style={{ fontFamily: '"MS 明朝", serif' }}>その心はどちらも「{quiz.answer}」でしょう</p>
            ) : (
              <>
                <p className="mb-1" style={{ fontFamily: '"MS 明朝", serif' }}>「{quiz.firstThing}」とかけまして</p>
                <p style={{ fontFamily: '"MS 明朝", serif' }}>「{quiz.secondThing}」と解く</p>
              </>
            )}
          </div>
        </div>
        
        <div className="mb-8 p-4 bg-opacity-10 bg-accent-yellow japanese-border">
          <h2 className="font-bold mb-3 border-l-4 border-accent-yellow pl-3">解説：</h2>
          <p style={{ fontFamily: '"MS 明朝", serif' }}>
            「{quiz.firstThing}」と「{quiz.secondThing}」は、
            どちらも「{quiz.answer}」という共通点があります。
          </p>
        </div>
        
        <div className="flex gap-4">
          <Link 
            href="/"
            className="flex-1 retro-button retro-button-secondary py-3 px-4 rounded-sm text-center"
          >
            ホームに戻る
          </Link>
          
          <Link 
            href={`/quiz/${getRandomQuizId(quizId)}?mode=${mode}`}
            className="flex-1 retro-button py-3 px-4 rounded-sm text-center"
            style={{ fontFamily: '"HG行書体", "MS 明朝", serif' }}
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