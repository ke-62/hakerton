import React, { useState } from 'react';
import RadarChart from './RadarChart';
import GapList from './GapList';
import { Search } from 'lucide-react';

const GapAnalysisTab = ({ gapAnalysis }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(true); // 로그인 시 바로 결과 표시

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    // 1.5초 후 분석 결과 표시 (로딩 연출)
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 1500);
  };

  if (!showResult) {
    return (
      <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-20 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
          <Search className={`w-10 h-10 text-red-500 ${isAnalyzing ? 'animate-bounce' : ''}`} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">나의 역량 갭 분석하기</h2>
        <p className="text-gray-500 mb-8 text-center">
          현재 보유한 기술과 목표 직무에서 요구하는 기술을<br />
          AI가 정밀하게 비교 분석합니다.
        </p>
        <button
          onClick={handleStartAnalysis}
          disabled={isAnalyzing}
          className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {isAnalyzing ? '데이터 분석 중...' : '분석 시작하기'}
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 animate-in fade-in duration-500">
      {/* 육각형 레이더 차트 */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">역량 Gap Analysis</h2>
        <RadarChart gapAnalysis={gapAnalysis} />

        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-rose-500 rounded"></div>
            <span className="text-sm text-gray-700">현재 역량</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/50 rounded border border-red-500"></div>
            <span className="text-sm text-gray-700">목표 역량</span>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4">
          <h3 className="font-bold text-gray-800 mb-2">종합 분석</h3>
          <p className="text-sm text-gray-700">
            현재 웹개발 역량이 가장 우수하며, AI/ML 분야에서 가장 큰 성장 기회가 있습니다.
            목표 달성을 위해 시스템설계 과목 이수를 추천합니다.
          </p>
        </div>
      </div>
      <GapList gapAnalysis={gapAnalysis} />
    </div>
  );
};

export default GapAnalysisTab;