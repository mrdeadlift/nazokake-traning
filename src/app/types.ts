export type NazokakeQuiz = {
  id: string;
  firstThing: string;  // 〇〇とかけまして
  secondThing: string; // 〇〇と説く
  answer: string;      // その心はどちらも〇〇でしょう
  explanation?: string; // 問題の詳細な解説
};

export type QuizMode = 'organized' | 'messy'; 