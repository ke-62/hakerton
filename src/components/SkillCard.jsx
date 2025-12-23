import React from 'react';
import { TrendingUp, BookOpen } from 'lucide-react';

const SkillCard = ({ capability, onClick }) => {
  // value 값을 퍼센트로 변환 (0.0 ~ 1.0 -> 0 ~ 100)
  const valuePercent = Math.round((capability?.value || 0) * 100);
  const courseCount = capability?.courseCount || 0;
  const totalWeight = capability?.totalWeight || 0;
  
  // 역량 값에 따른 색상 결정
  const getColorByValue = (value) => {
    if (value >= 0.8) return 'from-[#EA7274] to-[#F49795]'; // 높음
    if (value >= 0.6) return 'from-[#FBBAB7] to-[#FCC5C3]'; // 중상
    if (value >= 0.4) return 'from-[#FCC5C3] to-[#FFD4D2]'; // 중간
    if (value >= 0.2) return 'from-[#FFD4D2] to-[#FFE0DE]'; // 중하
    return 'from-gray-300 to-gray-400'; // 낮음
  };

  return (
    <div
      onClick={() => onClick && onClick(capability)}
      className="group cursor-pointer"
    >
      <div className={`bg-gradient-to-br ${getColorByValue(capability?.value || 0)} rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-white/50 text-white`}>
        <div className="flex items-start justify-between mb-4">
          <TrendingUp className="w-8 h-8 opacity-90" />
          <div className="text-right">
            <div className="text-xs opacity-80">역량 수치</div>
            <div className="text-2xl font-bold">{valuePercent}%</div>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-2">{capability?.capabilityName || '역량명 없음'}</h3>
        <p className="text-xs opacity-80 mb-4">{capability?.category || '역량'}</p>
        
        {/* 프로그레스 바 */}
        <div className="bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all shadow-sm"
            style={{ width: `${valuePercent}%` }}
          ></div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center border border-white/20">
            <div className="text-xs opacity-80">이수 과목</div>
            <div className="font-bold text-sm">{courseCount}개</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center border border-white/20">
            <div className="text-xs opacity-80">총 가중치</div>
            <div className="font-bold text-sm">{totalWeight.toFixed(1)}</div>
          </div>
        </div>

        {/* 과목 목록 미리보기 */}
        {capability?.courses && capability.courses.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 opacity-80" />
              <span className="text-xs opacity-80 font-medium">관련 과목</span>
            </div>
            <div className="space-y-1">
              {capability.courses.slice(0, 2).map((course, idx) => (
                <div key={idx} className="text-xs opacity-90 bg-white/10 rounded px-2 py-1">
                  {course?.courseName || '과목명 없음'} ({(course?.grade || 0).toFixed(1)})
                </div>
              ))}
              {capability.courses.length > 2 && (
                <div className="text-xs opacity-70 text-center">
                  +{capability.courses.length - 2}개 더보기
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
