import React from 'react';

const GapList = ({ gapAnalysis }) => {
  const { current, target, labels } = gapAnalysis;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      <div className="space-y-4">
        {labels.map((label, idx) => {
          const gap = target[idx] - current[idx];

          return (
            <div key={idx} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-7 hover:border-[#FBBAB7] hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-5">
                <span className="font-bold text-gray-800 text-2xl">{label}</span>
                <div className="px-5 py-2 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] rounded-full">
                  <span className="text-lg font-bold text-white">
                    Gap {gap}점
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-gray-600">현재 역량</span>
                    <span className="text-lg font-bold text-[#F49795]">{current[idx]}점</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FBBAB7] to-[#F49795] h-full rounded-full transition-all"
                      style={{ width: `${current[idx]}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-gray-600">목표 역량</span>
                    <span className="text-lg font-bold text-[#EA7274]">{target[idx]}점</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#F49795] to-[#EA7274] h-full rounded-full transition-all"
                      style={{ width: `${target[idx]}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {gap > 15 && (
                <div className="mt-5 text-lg text-gray-700 bg-gradient-to-r from-[#FFF5F5] to-[#FFE8E8] border-2 border-[#FBBAB7] rounded-lg p-4">
                  <span className="font-bold text-[#EA7274]">추천 과목:</span> 고급 {label}
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