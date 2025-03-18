"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NazokakeQuiz } from "../../types";
import { getQuizById, getRandomQuiz } from "../../utils/quizUtils";

// なぞかけの詳細解説を取得する関数
function getDetailedExplanation(quiz: NazokakeQuiz): string {
  // 問題IDに基づいて詳細な解説を返す
  const explanations: Record<string, string> = {
    "1": `「海」には波があり、「牛丼」は並盛りがあります。「なみ」という言葉の二重の意味を使ったなぞかけです。`,
    "2": `「漫画家」は絵や文字を書く仕事、「秘密の関係」は隠し事という意味です。「かくしごと」という言葉の二重の意味を利用しています。`,
    "3": `「政治家」には党首（とうしゅ）と保守（ほしゅ）の政治家がいて、「プロ野球選手」には投手（とうしゅ）と捕手（ほしゅ）がいます。さらに内閣と内角を攻めるという言葉遊びも含まれています。`,
    "4": `「疲れてヘトヘト」の時は労り（いたわり）が必要で、「空手家」は板割り（いたわり）をします。「いたわり」という言葉の異なる意味を使っています。`,
    "5": `「事故」は死角（しかく）があると起きやすく、「仕事に困らない」ためには資格（しかく）が役立ちます。同じ「しかく」でも全く異なる意味を持つ言葉です。`,
    "6": `「誘拐」は人がさらわれることで、「夫婦喧嘩」ではつい皿が割れる（さらわれる）ことがあります。同じ「さらわれる」でも意味が異なります。`,
    "7": `「受験」では試験官（しけんかん）が監督し、「理科の実験」では試験管（しけんかん）を使います。漢字は異なりますが同じ読み方の言葉です。`,
    "8": `「ホームレス」は公園（こうえん）を占拠（せんきょ）し、「AKB48」は講演（こうえん）で選挙（せんきょ）を行います。同じ読みだが意味の異なる言葉の組み合わせです。`,
    "9": `「ビール」は泡がないと不満、「恋人」は合わないと不満です。「あわない」という言葉の異なる意味を使ったなぞかけです。`,
    "10": `「100メートル走」は秒（びょう）を気にしますが、調味料を使いすぎると病気（びょうき）になることもあります。「びょう、きになる」という言葉遊びです。`,
    "11": `「新聞紙」には記事（きじ）が必要で、「桃太郎」の仲間には雉（きじ）がいます。同じ「きじ」でも全く異なる意味を持つ言葉です。`,
    "12": `「グラビアアイドル」は胸のパットを入れることがあり、「味の素」は料理にパッと入れて味をごまかすことがあります。「ぱっといれる」という言葉の異なる使い方です。`,
    "13": `「労働」すると疲労（ひろう）し、「発表会」では成果を披露（ひろう）します。読み方は同じですが、漢字が異なる「ひろう」という言葉を使ったなぞかけです。`,
    "14": `「ガラス」は無色（むしょく）で透明、「ニート」は無職（むしょく）の状態です。同じ「むしょく」という読みでも意味が異なります。`,
    "15": `「ゴルゴ13」は銃（じゅう）で敵を死（し）に至らしめる暗殺者、「アナログ時計」では10（じゅう）の次に4（し）があります。「じゅう」と「し」の数字と意味の両方を掛けた言葉遊びです。`,
    "16": `「遭難」した船は難破船（なんぱせん）になり、「真面目な男子」はナンパをしない（なんぱせん）という意味です。「なんぱせん」の二重の意味を活かしています。`,
    "17": `「好きな人」は離したくない（はなしたくない）、「嫌いな人」は話したくない（はなしたくない）です。「はなす」の異なる意味を使った言葉遊びです。`,
    "18": `「法廷」では判決（はんけつ）が出され、「Tバック」は半ケツ（はんけつ）が見えます。「はんけつ」という言葉の全く異なる二つの意味を使っています。`,
    "19": `「弓道」では袴（はかま）を着て、「お盆」には墓参り（はかまいり）をします。「はかま」と「はかまいり」の語感の類似性を利用したなぞかけです。`,
    "20": `「美少女アニメキャラ」はファンが萌える（もえる）対象で、「枯れ葉」は燃える（もえる）ものです。読み方は同じですが意味の異なる「もえる」を使っています。`,
    "21": `「1人ぼっちのクリスマス」は予定が空いている（あいている）状態で、「恋人とのクリスマス」は相手がいる（あいている）状態です。「あいている」の二重の意味を使っています。`,
    "22": `「枝豆」はサヤ（さや）から出して食べ、「竹刀」は鞘（さや）に入れる必要がありません。「さや」という同じ言葉でも使い方が異なることを利用しています。`,
    "23": `「ゴルフ」は内緒でラウンド（コースを回ること）することがあり、「不倫」も内緒で関係を持つこと。「ないしょでラウンドする」という表現の二重の意味を使っています。`,
    "24": `「高校生」は19歳（じゅうきゅう）になると卒業し、「アイドル」も19歳を過ぎると人気が終わりがちです。「じゅうきゅうになるとおわり」という言葉遊びです。`,
    "25": `「借金」は晴れる（はれる）と嬉しく、「天気」も晴れる（はれる）と気持ちがいいです。同じ「はれる」でも意味が異なります。`,
    "26": `「掃除機」はゴミを吸う（ごみをすう）もので、「政治家」は汚職などのゴミ（不正）を吸う（かかわる）こともあります。「ごみをすう」の二重の意味を表現しています。`,
    "27": `「UFO」の正体は分からない（わからない）もので、「彼女の気持ち」も分からない（わからない）ことが多いです。同じ「わからない」ですが、対象が全く異なる点が面白いなぞかけです。`,
    "28": `「英語と数学」は勉強で食べる（たべる=学習する）のが大変で、「大食いタレント」は本当に食べる（たべる）量が大変です。「たべる」の比喩的な意味と実際の意味を比較しています。`,
    "29": `「犬を散歩させる人」は躾（しつけ）をする（そうしきする）ことが大切で、「葬儀屋」は葬式（そうしき）をする仕事です。「そうしきする」の音の類似性を利用しています。`,
    "30": `「歯医者」は歯を抜くときにはさみ（はさみ）を使い、「カニ」はハサミ（はさみ）を持っています。同じ「はさみ」でも意味が異なる言葉遊びです。`,
    "31": `「バーゲンセール」では品物が安い（やすい）、「いびき」は眠っている（ねむっている）時に出るもので、「安眠（あんみん）」という共通点があります。`,
    "32": `「ピアノ」は指（ゆび）を鍵盤に当てて演奏し、「四字熟語」は四つの漢字を揃えた（そろえた）表現です。「ゆびをそろえる」という言葉遊びです。`,
    "33": `「国会議員」は演説（えんぜつ）をする仕事、「歯医者」は抜歯（ばつし）をする仕事です。「えんぜつ」と「ばつし」の語感の類似性を利用しています。`,
    "34": `「授業中の私語」はうるさい（うるさい）ため注意され、「新幹線」は浦佐（うらさ）という駅を通過します。「うらさ（い）」という音の類似性を利用したなぞかけです。`,
    "35": `「ジャンプ」は跳ぶ（とぶ）動作で、「テレビ」はチャンネルが飛ぶ（とぶ）ことがあります。同じ「とぶ」でも意味合いが異なります。`,
    "36": `「コップの中の水」は満たされる（みたされる）もので、「受験に成功した人」も満足感で満たされます（みたされる）。同じ「みたされる」でも対象が異なります。`,
    "37": `「怒られた子供」は震える（ふるえる）ことがあり、「古着屋」は古い服（ふるい）を売る（うる）場所です。「ふるえる」と「ふるいをうる」の語感の類似性を利用しています。`,
    "38": `「夏休みの宿題」はたまる（たまる）ものであり、「パチンコ」は玉（たま）を打つ（うつ）ゲームです。「たまる」と「たまをうつ」の言葉遊びです。`,
    "39": `「お化け屋敷」は恐い（こわい）場所で、「古い家」は壊れやすい（こわれやすい）ものです。「こわい」と「こわれやすい」の語感の類似性を利用しています。`,
    "40": `「あんこの多い大福」は重い（おもい）と感じ、「失恋」すると思い（おもい）が重くなります。同じ「おもい」でも意味が異なるなぞかけです。`,
    "41": `「ダイエット」は痩せる（やせる）ことが目的で、「お金持ち」はケチだと痩せる（出費を抑える意味でやせる）ことがあります。同じ「やせる」でも全く異なる文脈を持ちます。`,
    "42": `「ラーメン」は啜る（すする）ように食べ、「プールの水」を吸う（すう）とむせます。「すする」と「すう」の音の類似性を利用したなぞかけです。`,
    "43": `「散髪屋」は髪を切る（きる）場所で、「辞書」は言葉の意味を切り分ける（きりわける）ものです。「きる」という言葉の異なる使い方を利用しています。`,
    "44": `「信号機」は交通を制御する信号（しんごう）を出し、「相撲取り」は四股（しこ）を踏みます。「しんごう」と「しこ」の音の類似性を利用したなぞかけです。`,
    "45": `「ハチミツ」は蜂（はち）が蜜（みつ）を集めたもので、「ルービックキューブ」は六面（ろくめん）体の立方体（りっぽうたい）です。「はちみつ」と「ろくめんりっぽう」の数字の対比を利用しています。`,
    "46": `「鼻血」は出る（でる）と困り、「電車」は出る（でる）時間が決まっています。同じ「でる」でも意味合いが全く異なります。`,
    "47": `「ゴミ箱」はゴミを捨てる（すてる）場所で、「絶望」は希望を捨てる（すてる）状態です。同じ「すてる」でも対象が全く異なります。`,
    "48": `「失恋」すると胸が痛い（むねがいたい）と感じ、「風邪」をひくと胸が痛い（むねがいたい）症状が出ることがあります。同じ「むねがいたい」でも原因が全く異なります。`,
    "49": `「雨」は降る（ふる）もので、「振り子」は振れる（ふれる）動きをします。「ふる」と「ふれる」の語感の類似性を利用したなぞかけです。`,
    "50": `「電話」はかける（かける）もので、「眼鏡」もかける（かける）ものです。同じ「かける」という言葉でも使い方が異なります。`,
  };

  // その他のIDの場合のデフォルト解説
  if (!explanations[quiz.id]) {
    return `「${quiz.firstThing}」と「${quiz.secondThing}」は、どちらも「${quiz.answer}」という共通点があります。この言葉の二重の意味や読みの面白さがなぞかけの妙味です。`;
  }

  return explanations[quiz.id];
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

export default function ResultClient({ params }: { params: { id: string } }) {
  const [quiz, setQuiz] = useState<NazokakeQuiz | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const quizData = getQuizById(params.id);
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
  }, [params.id, router]);

  useEffect(() => {
    // ローカルストレージから回答を取得
    const savedAnswer = localStorage.getItem(`answer-${params.id}`);
    if (savedAnswer) {
      setAnswer(savedAnswer);
      if (quiz) {
        setIsCorrect(savedAnswer.trim() === quiz.answer.trim());
      }
    }
  }, [params.id, quiz]);

  if (!quiz) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  // 詳細な解説を取得
  const detailedExplanation = getDetailedExplanation(quiz);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f5e9] bg-[url('/washi.png')] p-8">
      <div className="w-full max-w-2xl bg-white/80 p-8 rounded border-8 border-double border-red-800 shadow-lg">
        <h1 className="text-3xl text-center mb-6 font-['HG行書体', 'MS_明朝', 'serif'] text-red-800 border-l-8 border-red-800 pl-4">結果発表</h1>
        
        <div className="mb-8 border-b-2 border-red-800 pb-4">
          <h2 className="text-xl mb-2 font-['MS_Pゴシック', 'sans-serif']">なぞかけ問題</h2>
          <p className="mb-1 text-lg"><span className="font-bold">「{quiz.firstThing}」</span>と<span className="font-bold">「{quiz.secondThing}」</span>の共通点は？</p>
        </div>

        <div className="mb-8 bg-yellow-50 p-4 border-l-4 border-yellow-500">
          <h2 className="text-xl mb-2 font-['MS_Pゴシック', 'sans-serif'] text-yellow-800">あなたの回答</h2>
          <p className="text-lg font-bold">{answer || "（回答なし）"}</p>
        </div>

        <div className={`mb-8 p-4 border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
          <h2 className="text-xl mb-2 font-['MS_Pゴシック', 'sans-serif'] text-gray-800">正解</h2>
          <p className="text-lg font-bold">{quiz.answer}</p>
          
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2 font-['MS_Pゴシック', 'sans-serif']">解説</h3>
            <p className="text-base">{detailedExplanation}</p>
          </div>
        </div>

        {isCorrect !== null && (
          <div className={`mb-8 p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <h2 className="text-xl font-bold mb-2 font-['MS_Pゴシック', 'sans-serif']">
              {isCorrect ? '正解です！おめでとうございます！' : '残念！不正解です。'}
            </h2>
            <p>
              {isCorrect 
                ? 'あなたはなぞかけの達人です！' 
                : `正解は「${quiz.answer}」でした。また挑戦してみてください！`}
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <button 
            onClick={() => router.push('/')} 
            className="retro-button bg-red-800 hover:bg-red-700 text-white py-2 px-6 focus:outline-none focus:shadow-outline"
          >
            ホームに戻る
          </button>
          <button 
            onClick={() => router.push(`/quiz/${getRandomQuizId(params.id)}`)} 
            className="retro-button bg-blue-800 hover:bg-blue-700 text-white py-2 px-6 focus:outline-none focus:shadow-outline"
          >
            別の問題に挑戦
          </button>
        </div>
      </div>
    </div>
  );
} 