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
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-center" style={{ fontFamily: '"HG行書体", "MS 明朝", serif' }}>
          なぞかけ問答
        </h1>
        <p className="text-lg opacity-80">古き良き日本の言葉遊び</p>
      </div>
      
      <div className="washi-pattern japanese-border p-8 max-w-md w-full">
        <div className="mb-6 text-center">
          <div className="w-16 h-1 bg-accent-red mx-auto mb-6"></div>
          <p className="text-lg" style={{ fontFamily: '"MS 明朝", serif' }}>
            挑戦したいモードを選んでください
          </p>
          <div className="w-16 h-1 bg-accent-red mx-auto mt-6"></div>
        </div>
        
        <div className="flex flex-col gap-6 mt-8">
          <button
            onClick={() => handleModeSelect('organized')}
            disabled={isLoading}
            className="retro-button py-4 px-6 rounded-sm text-lg font-medium disabled:opacity-50"
            style={{ fontFamily: '"HG行書体", "MS 明朝", serif' }}
          >
            整いました
          </button>
          
          <button
            onClick={() => handleModeSelect('messy')}
            disabled={isLoading}
            className="retro-button retro-button-secondary py-4 px-6 rounded-sm text-lg font-medium disabled:opacity-50"
            style={{ fontFamily: '"HG行書体", "MS 明朝", serif' }}
          >
            散らかりました
          </button>
        </div>
        
        <div className="mt-10 text-sm opacity-80">
          <div className="mb-4 p-3 border-l-4 border-accent-yellow">
            <p className="mb-2">
              <strong>整いました：</strong> 「◯◯とかけまして、◯◯と解く」形式の問題が出ます。
            </p>
            <p>
              <strong>散らかりました：</strong> 「その心はどちらも◯◯でしょう」から考える問題が出ます。
            </p>
          </div>
        </div>
      </div>
      
      <footer className="mt-12 text-sm opacity-70">
        <p>なぞかけクイズアプリ</p>
      </footer>
    </div>
  );
}
