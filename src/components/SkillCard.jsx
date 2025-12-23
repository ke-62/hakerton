import React from 'react';
import { Code } from 'lucide-react';
import { getCategoryColor } from '../utils/helpers';

const SkillCard = ({ skill, onClick }) => {
  return (
    <div
      onClick={() => onClick(skill)}
      className="group cursor-pointer"
    >
      <div className={`bg-gradient-to-br ${getCategoryColor(skill.category)} rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-white/50 text-white`}>
        <div className="flex items-start justify-between mb-4">
          <Code className="w-8 h-8 opacity-90" />
          <div className="text-right">
            <div className="text-xs opacity-80">레벨</div>
            <div className="text-2xl font-bold">{skill.level}/{skill.maxLevel}</div>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-3">{skill.name}</h3>
        
        {/* 프로그레스 바 */}
        <div className="bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all shadow-sm"
            style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
          ></div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center border border-white/20">
            <div className="text-xs opacity-80">채용 연관도</div>
            <div className="font-bold text-sm">{skill.jobRelevance}%</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center border border-white/20">
            <div className="text-xs opacity-80">선배 수강률</div>
            <div className="font-bold text-sm">{skill.seniorsTook}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
