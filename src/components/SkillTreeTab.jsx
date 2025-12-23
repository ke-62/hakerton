import React from 'react';
import SkillCard from './SkillCard';
import CourseDetailSidebar from './CourseDetailSidebar';
import { BookOpen } from 'lucide-react';

const SkillTreeTab = ({ capabilityValues, isLoadingCapabilities, selectedCourse, setSelectedCourse, onRechooseCourses }) => {
  if (isLoadingCapabilities) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-[#FBBAB7] border-t-[#EA7274] rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-600 font-medium">핵심역량을 분석하는 중...</p>
      </div>
    );
  }

  if (!capabilityValues || capabilityValues.length === 0) {
    return (
      <div className="bg-gray-50 rounded-2xl p-12 text-center">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">핵심역량 데이터가 없습니다</h3>
        <p className="text-gray-600 mb-6">과목을 선택하고 저장하면 핵심역량이 분석됩니다.</p>
        <button
          onClick={onRechooseCourses}
          className="px-6 py-3 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          과목 선택하기
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* 스킬 트리 메인 */}
      <div className="col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">핵심 역량 분석</h2>
            <p className="text-sm text-gray-600 mt-1">이수한 과목 기반으로 계산된 역량 수치입니다</p>
          </div>
          <button
            onClick={onRechooseCourses}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all text-sm"
          >
            과목 재선택
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {capabilityValues.map((capability, index) => (
            <SkillCard
              key={index}
              capability={capability}
              onClick={setSelectedCourse}
            />
          ))}
        </div>
      </div>

      {/* 상세 정보 사이드바 - 항상 표시 */}
      <CourseDetailSidebar
        selectedCourse={selectedCourse}
        onRechooseCourses={onRechooseCourses}
      />
    </div>
  );
};

export default SkillTreeTab;