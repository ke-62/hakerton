import React from 'react';
import SkillCard from './SkillCard';
import CourseDetailSidebar from './CourseDetailSidebar';

const SkillTreeTab = ({ skillTree, selectedCourse, setSelectedCourse }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* 스킬 트리 메인 */}
      <div className="col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">스킬 트리</h2>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#FBBAB7]/20 rounded-full border border-[#FBBAB7]">
              <div className="w-3 h-3 bg-gradient-to-br from-[#FBBAB7] to-[#F49795] rounded-full"></div>
              <span className="text-sm text-gray-700">기초</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#F49795]/20 rounded-full border border-[#F49795]">
              <div className="w-3 h-3 bg-gradient-to-br from-[#F49795] to-[#EA7274] rounded-full"></div>
              <span className="text-sm text-gray-700">개발</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#EA7274]/20 rounded-full border border-[#EA7274]">
              <div className="w-3 h-3 bg-gradient-to-br from-[#EA7274] to-[#d85d5f] rounded-full"></div>
              <span className="text-sm text-gray-700">심화</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {skillTree.map(skill => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onClick={setSelectedCourse}
            />
          ))}
        </div>
      </div>

      {/* 상세 정보 사이드바 */}
      <CourseDetailSidebar selectedCourse={selectedCourse} />
    </div>
  );
};

export default SkillTreeTab;
