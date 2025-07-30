'use client'
import { useState } from "react";
import { useSetAtom } from 'jotai';
import { chatMessageAtom } from '@/atoms';

export function TripPlanner() {
  const [when, setWhen] = useState("今日");
  const [withWhom, setWithWhom] = useState("ひとりで");
  const [where, setWhere] = useState("");
  const setChatMessage = useSetAtom(chatMessageAtom);

  const handleSubmit = () => {
    if (!where.trim()) {
      alert("「どこに行く」を入力してください");
      return;
    }
    
    // ChatWidgetに自動送信するためのメッセージを設定
    const message = `${when}、${withWhom}で${where}に行く予定です。候補となる場所を5件教えてください`;
    setChatMessage(message);
  };

  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">旅行プランナー</h1>
      <div className="bg-white/10 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="when" className="block text-sm font-medium mb-2">
              いつ
            </label>
            <input
              id="when"
              type="text"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="例: 今日、明日、来週末"
              className="w-full p-3 border border-gray-300 rounded-md bg-white/80 text-black"
            />
          </div>
          <div>
            <label htmlFor="withWhom" className="block text-sm font-medium mb-2">
              誰と
            </label>
            <input
              id="withWhom"
              type="text"
              value={withWhom}
              onChange={(e) => setWithWhom(e.target.value)}
              placeholder="例: 子供、夫、妻、家族"
              className="w-full p-3 border border-gray-300 rounded-md bg-white/80 text-black"
            />
          </div>
          <div>
            <label htmlFor="where" className="block text-sm font-medium mb-2">
              どこに行く
            </label>
            <input
              id="where"
              type="text"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
              placeholder="例: カフェ、遊び場、公園、道の駅"
              className="w-full p-3 border border-gray-300 rounded-md bg-white/80 text-black"
              required
            />
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!where.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            プランを生成
          </button>
        </div>
      </div>
    </div>
  );
} 