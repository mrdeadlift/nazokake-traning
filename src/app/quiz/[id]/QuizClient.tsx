"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { NazokakeQuiz, QuizMode } from "../../types";

interface QuizClientProps {
  quiz: NazokakeQuiz | null;
  quizId: string;
}

export default function QuizClient({ quiz, quizId }: QuizClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") as QuizMode || "organized";
  const [userAnswer, setUserAnswer] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim()) {
      router.push(`/result/${quizId}?mode=${mode}&answer=${encodeURIComponent(userAnswer)}`);
    }
  };

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
          {mode === "organized" ? "整いました！" : "散らかりました！"}
        </h1>
        
        <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
          {mode === "organized" ? (
            <>
              <p className="text-lg mb-2">「{quiz.firstThing}」とかけまして</p>
              <p className="text-lg">「{quiz.secondThing}」と解く</p>
            </>
          ) : (
            <p className="text-lg">その心はどちらも「{quiz.answer}」でしょう</p>
          )}
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="answer" className="block mb-2 font-medium">
              {mode === "organized" 
                ? "その心はどちらも...？" 
                : "何とかけて何と解く？"}
            </label>
            <input
              id="answer"
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              placeholder={mode === "organized" 
                ? "「〇〇〇」でしょう" 
                : "「〇〇〇」とかけて「〇〇〇」と解く"}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            回答する
          </button>
        </form>
      </div>
    </div>
  );
} 