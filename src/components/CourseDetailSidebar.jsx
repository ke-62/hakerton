import React from 'react';
import { BookOpen, TrendingUp, Award, Sparkles } from 'lucide-react';

const CourseDetailSidebar = ({ selectedCourse }) => {
  if (!selectedCourse) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-gray-800">역량 상세</h3>
          </div>
          <p className="text-sm text-gray-600">
            역량 카드를 선택하면 상세한 정보를 확인할 수 있습니다.
          </p>
        </div>
      </div>
    );
  }

  // capability 객체 구조에 맞춰 표시
  const capability = selectedCourse;
  const valuePercent = Math.round((capability?.value || 0) * 100);
  const totalWeight = capability?.totalWeight || 0;
  const courseCount = capability?.courseCount || 0;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#EA7274] to-[#F49795] rounded-xl flex items-center justify-center shadow-md">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{capability?.capabilityName || '역량'}</h3>
            <p className="text-sm text-gray-500">{capability?.category || '핵심역량'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-700">역량 수치</span>
              <span className="text-2xl font-bold text-blue-600">{valuePercent}%</span>
            </div>
            <div className="bg-white rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all"
                style={{ width: `${valuePercent}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-600 mb-1">이수 과목</div>
              <div className="text-xl font-bold text-gray-800">{courseCount}개</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-600 mb-1">총 가중치</div>
              <div className="text-xl font-bold text-gray-800">{totalWeight.toFixed(1)}</div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">관련 이수 과목</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {capability?.courses && capability.courses.length > 0 ? (
                capability.courses.map((course, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 border border-green-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800">{course?.courseName || '과목명 없음'}</span>
                      <span className="text-xs font-bold text-green-600">{(course?.grade || 0).toFixed(1)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{course?.courseCode || 'N/A'}</span>
                      <span>가중치: {(course?.weight || 0).toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      점수: {(course?.gradeScore || 0).toFixed(1)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 text-center py-4">
                  관련 과목 정보가 없습니다
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-gray-800">역량 분석</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          총 {courseCount}개 과목을 통해 <span className="font-bold text-amber-700">{capability?.capabilityName || '역량'}</span> 역량을 습득했습니다.
        </p>
        <p className="text-sm text-gray-600">
          현재 역량 수치는 <span className="font-bold text-amber-700">{valuePercent}%</span>로, 
          {valuePercent >= 80 ? ' 매우 우수한 수준입니다! 🎉' : 
           valuePercent >= 60 ? ' 양호한 수준입니다. 👍' : 
           ' 추가 학습을 권장합니다. 📚'}
        </p>
      </div>
    </div>
  );
};

export default CourseDetailSidebar;
