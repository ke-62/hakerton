import React from 'react';
import { BookOpen, TrendingUp, Navigation, Sparkles } from 'lucide-react';
import { getCategoryColor } from '../utils/helpers';

const CourseDetailSidebar = ({ selectedCourse }) => {
  if (!selectedCourse) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-gray-800">AI 추천</h3>
          </div>
          <p className="text-sm text-gray-600">
            과목을 선택하면 상세한 정보와 AI 기반 추천을 확인할 수 있습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(selectedCourse.category)} rounded-xl flex items-center justify-center shadow-md`}>
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{selectedCourse.name}</h3>
            <p className="text-sm text-gray-500">레벨 {selectedCourse.level}/{selectedCourse.maxLevel}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">추천 이유</span>
            </div>
            <p className="text-sm text-gray-700">
              {selectedCourse.description}
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-700">다음 단계</span>
            </div>
            <p className="text-sm text-gray-700">
              이 과목을 완료하면 "{selectedCourse.nextCourses?.join('", "')}" 과목이 해금됩니다.
            </p>
          </div>

          <button className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-red-500/30 transition-all">
            수강 신청하기
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-gray-800">AI 추천</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          "데이터베이스" 과목 수강신청에 실패하셨나요? 대신 "NoSQL 실습" 과목으로 우회하면 동일한 역량을 습득할 수 있습니다.
        </p>
        <button className="text-sm text-amber-700 hover:text-amber-800 font-medium">
          대체 경로 보기 →
        </button>
      </div>
    </div>
  );
};

export default CourseDetailSidebar;
