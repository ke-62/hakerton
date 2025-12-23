import React from 'react';

const GapList = ({ gapAnalysis }) => {
  const { current, target, labels } = gapAnalysis;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">우선 이수 추천</h2>

      <div className="space-y-4">
        {labels.map((label, idx) => {
          const gap = target[idx] - current[idx];
          const gapColor = gap > 20 ? 'text-red-600' : gap > 10 ? 'text-amber-600' : 'text-green-600';

          return (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-800">{label}</span>
                <span className={`text-sm font-bold ${gapColor}`}>
                  Gap: {gap}점
                </span>
              </div>

              <div className="flex gap-2 mb-3">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">현재</div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-rose-500 h-full rounded-full transition-all"
                      style={{ width: `${current[idx]}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-rose-600 mt-1 font-medium">{current[idx]}점</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">목표</div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full transition-all"
                      style={{ width: `${target[idx]}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-red-600 mt-1 font-medium">{target[idx]}점</div>
                </div>
              </div>

              {gap > 15 && (
                <div className="text-sm text-gray-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <strong className="text-amber-700">추천:</strong> "고급 {label}" 과목 이수 권장
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GapList;