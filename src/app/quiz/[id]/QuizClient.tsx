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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim()) {
      router.push(`/result/${quizId}?mode=${mode}&answer=${encodeURIComponent(userAnswer)}`);
    }
  };

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
          {mode === "organized" ? "整いました！" : "散らかりました！"}
        </h1>
        <div className="w-16 h-1 bg-accent-red mx-auto mb-6"></div>
        
        <div className="mb-8 p-6 bg-opacity-20 bg-accent-yellow japanese-border">
          {mode === "organized" ? (
            <>
              <p className="text-lg mb-2" style={{ fontFamily: '"MS 明朝", serif' }}>「{quiz.firstThing}」とかけまして</p>
              <p className="text-lg" style={{ fontFamily: '"MS 明朝", serif' }}>「{quiz.secondThing}」と解く</p>
            </>
          ) : (
            <p className="text-lg" style={{ fontFamily: '"MS 明朝", serif' }}>その心はどちらも「{quiz.answer}」でしょう</p>
          )}
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="answer" className="block mb-3 font-medium border-l-4 border-accent-green pl-3">
              {mode === "organized" 
                ? "その心はどちらも...？" 
                : "何とかけて何と解く？"}
            </label>
            <input
              id="answer"
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-3 border border-card-border japanese-border bg-card-bg"
              placeholder={mode === "organized" 
                ? "「〇〇〇」でしょう" 
                : "「〇〇〇」とかけて「〇〇〇」と解く"}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full retro-button py-3 px-6 rounded-sm font-medium mt-4"
            style={{ fontFamily: '"HG行書体", "MS 明朝", serif' }}
          >
            回答する
          </button>
        </form>
      </div>
    </div>
  );
} 