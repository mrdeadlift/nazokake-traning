"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getRandomQuiz } from "./utils/quizUtils";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleModeSelect = (mode: 'organized' | 'messy') => {
    setIsLoading(true);
    const quiz = getRandomQuiz();
    router.push(`/quiz/${quiz.id}?mode=${mode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-center">なぞかけクイズ</h1>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <p className="text-lg text-center mb-6">
          挑戦したいモードを選んでください
        </p>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleModeSelect('organized')}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            整いました
          </button>
          
          <button
            onClick={() => handleModeSelect('messy')}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            散らかりました
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            <strong>整いました：</strong> 「◯◯とかけまして、◯◯と解く」形式の問題が出ます。
          </p>
          <p>
            <strong>散らかりました：</strong> 「その心はどちらも◯◯でしょう」から考える問題が出ます。
          </p>
        </div>
      </div>
    </div>
  );
}
