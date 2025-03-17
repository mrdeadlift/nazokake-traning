import { quizzes } from "../data/quizzes";
import { NazokakeQuiz } from "../types";

/**
 * ランダムなクイズを取得する
 */
export const getRandomQuiz = (): NazokakeQuiz => {
  const randomIndex = Math.floor(Math.random() * quizzes.length);
  return quizzes[randomIndex];
};

/**
 * IDでクイズを取得する
 */
export const getQuizById = (id: string): NazokakeQuiz | undefined => {
  return quizzes.find(quiz => quiz.id === id);
}; 