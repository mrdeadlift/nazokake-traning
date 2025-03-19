"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NazokakeQuiz } from "../../types";
import { getQuizById, getRandomQuiz } from "../../utils/quizUtils";

// なぞかけの詳細解説を取得する関数
function getDetailedExplanation(quiz: NazokakeQuiz): string {
  // クイズオブジェクトに解説がある場合はそれを返す
  if (quiz.explanation) {
    return quiz.explanation;
  }
  
  // 解説がない場合のデフォルト解説
  return `「${quiz.firstThing}」と「${quiz.secondThing}」は、どちらも「${quiz.answer}」という共通点があります。この言葉の二重の意味や読みの面白さがなぞかけの妙味です。`;
}

// 現在のIDと異なるランダムなクイズIDを取得する関数
function getRandomQuizId(currentId: string): string {
  // 現在のIDと異なるIDが出るまでランダムに取得
  let randomQuiz;
  do {
    randomQuiz = getRandomQuiz();
  } while (randomQuiz.id === currentId);
  
  return randomQuiz.id;
}

export default function ResultClient({ quizId }: { quizId: string }) {
  const [quiz, setQuiz] = useState<NazokakeQuiz | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const quizData = getQuizById(quizId);
      if (quizData) {
        setQuiz(quizData);
      } else {
        console.error('Quiz not found');
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      router.push('/');
    }
  }, [quizId, router]);

  useEffect(() => {
    // URLパラメータから回答を取得
    const urlAnswer = searchParams.get('answer');
    
    if (urlAnswer) {
      // URLから取得した回答をローカルストレージに保存
      localStorage.setItem(`answer-${quizId}`, urlAnswer);
      setAnswer(urlAnswer);
    } else {
      // ローカルストレージから回答を取得
      const savedAnswer = localStorage.getItem(`answer-${quizId}`);
      if (savedAnswer) {
        setAnswer(savedAnswer);
      }
    }
  }, [quizId, quiz, searchParams]);

  if (!quiz) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  // 詳細な解説を取得
  const detailedExplanation = getDetailedExplanation(quiz);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="washi-pattern japanese-border p-8 max-w-md w-full">
        <div className="mb-8 border-b-2 pb-4">
          <h2 className="text-xl mb-2 font-['MS_Pゴシック', 'sans-serif']">なぞかけ問題</h2>
          <p className="mb-1 text-lg"><span className="font-bold">「{quiz.firstThing}」</span>と<span className="font-bold">「{quiz.secondThing}」</span>の共通点は？</p>
        </div>

        <div className="mb-8 p-6 bg-opacity-20 bg-accent-yellow japanese-border">
          <h2 className="text-xl mb-2 font-['MS_Pゴシック', 'sans-serif'] ">あなたの回答</h2>
          <p className="text-lg font-bold">{answer || "（回答なし）"}</p>
        </div>

        <div className="mb-8 p-6 bg-opacity-20 bg-accent-yellow japanese-border">
          <h2 className="text-xl mb-2 font-['MS_Pゴシック', 'sans-serif']">正解</h2>
          <p className="text-lg font-bold">{quiz.answer}</p>
          
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2 font-['MS_Pゴシック', 'sans-serif']">解説</h3>
            <p className="text-base">{detailedExplanation}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <button 
            onClick={() => router.push('/')} 
            className="retro-button bg-red-800 hover:bg-red-700 text-white py-2 px-6 focus:outline-none focus:shadow-outline"
          >
            ホームに戻る
          </button>
          <button 
            onClick={() => router.push(`/quiz/${getRandomQuizId(quizId)}`)} 
            className="retro-button-secondary bg-blue-800 hover:bg-blue-700 text-white py-2 px-6 focus:outline-none focus:shadow-outline"
          >
            別の問題に挑戦
          </button>
        </div>
      </div>
    </div>
  );
} 