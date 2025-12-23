import React from 'react';
import RadarChart from './RadarChart';
import GapList from './GapList';

const GapAnalysisTab = ({ gapAnalysis }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
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

      {/* 우선순위 리스트 */}
      <GapList gapAnalysis={gapAnalysis} />
    </div>
  );
};

export default GapAnalysisTab;
