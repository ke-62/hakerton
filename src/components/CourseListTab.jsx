import React from 'react';
import { BookOpen, CheckCircle, Link as LinkIcon, Award, TrendingUp } from 'lucide-react';

const CourseListTab = ({ completedCourses, allCourses }) => {
  if (!completedCourses || completedCourses.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-16 text-center border-2 border-dashed border-gray-300">
        <BookOpen className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-800 mb-3">이수한 과목이 없습니다</h3>
        <p className="text-gray-600 text-lg">과목을 선택하고 저장하면 이수 과목 목록이 표시됩니다.</p>
      </div>
    );
  }

  // 학점을 점수로 변환
  const gradeToScore = {
    'A+': 4.5, 'A': 4.0, 'B+': 3.5, 'B': 3.0,
    'C+': 2.5, 'C': 2.0, 'D+': 1.5, 'D': 1.0, 'F': 0.0
  };

  // 학점별 색상
  const getGradeColor = (grade) => {
    const score = gradeToScore[grade] || 0;
    if (score >= 4.0) return 'from-[#EA7274] to-[#F49795]';
    if (score >= 3.0) return 'from-[#FBBAB7] to-[#FCC5C3]';
    if (score >= 2.0) return 'from-[#FFD4D2] to-[#FFE0DE]';
    return 'from-gray-300 to-gray-400';
  };

  const getGradeBadgeColor = (grade) => {
    const score = gradeToScore[grade] || 0;
    if (score >= 4.0) return 'bg-gradient-to-r from-[#FFF5F5] to-[#FFE8E8] text-[#EA7274] border-[#FBBAB7]';
    if (score >= 3.0) return 'bg-gradient-to-r from-[#FFF9F8] to-[#FFF5F5] text-[#F49795] border-[#FCC5C3]';
    if (score >= 2.0) return 'bg-gradient-to-r from-[#FFFBFA] to-[#FFF9F8] text-[#FBBAB7] border-[#FFD4D2]';
    return 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border-gray-300';
  };

  // 전체 과목 정보 찾기
  const getCourseInfo = (courseCode) => {
    return allCourses?.find(c => c.code === courseCode);
  };

  // 평균 학점 계산
  const averageGPA = completedCourses.length > 0
    ? (completedCourses.reduce((sum, c) => sum + (gradeToScore[c.grade] || 0), 0) / completedCourses.length).toFixed(2)
    : '0.00';

  // 총 학점
  const totalCredits = completedCourses.reduce((sum, c) => {
    const courseInfo = getCourseInfo(c.code || c.id);
    return sum + (courseInfo?.credits || 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FBBAB7] to-[#F49795] rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">이수 과목</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#EA7274] to-[#F49795] bg-clip-text text-transparent">
                {completedCourses.length}
              </p>
              <p className="text-xs text-gray-500">개 과목</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#EA7274] to-[#F49795] rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">평균 학점</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#EA7274] to-[#F49795] bg-clip-text text-transparent">
                {averageGPA}
              </p>
              <p className="text-xs text-gray-500">/ 4.5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FBBAB7] to-[#FCC5C3] rounded-2xl flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">총 학점</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#F49795] to-[#FBBAB7] bg-clip-text text-transparent">
                {totalCredits}
              </p>
              <p className="text-xs text-gray-500">학점</p>
            </div>
          </div>
        </div>
      </div>

      {/* 과목 목록 */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FBBAB7] to-[#F49795] rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">이수 과목 목록</h3>
              <p className="text-sm text-gray-500">선이수과목 정보와 함께 확인하세요</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {completedCourses.map((course, index) => {
              const courseInfo = getCourseInfo(course.code || course.id);
              const hasPrerequisites = courseInfo?.prerequisites && courseInfo.prerequisites.length > 0;

              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-[#FBBAB7] transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="text-xl font-bold text-gray-800 group-hover:text-[#EA7274] transition-colors">
                          {course.name || courseInfo?.name || '과목명 없음'}
                        </h4>
                        <span className={`px-4 py-1.5 rounded-xl text-sm font-bold border-2 shadow-sm ${getGradeBadgeColor(course.grade)}`}>
                          {course.grade}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm mb-3">
                        {courseInfo?.credits && (
                          <span className="px-3 py-1 bg-gradient-to-r from-[#FFF5F5] to-[#FFE8E8] text-[#EA7274] rounded-lg font-bold border border-[#FBBAB7]">
                            {courseInfo.credits}학점
                          </span>
                        )}
                        {courseInfo?.semester && (
                          <span className="px-3 py-1 bg-gradient-to-r from-[#FFF9F8] to-[#FFF5F5] text-[#F49795] rounded-lg font-bold border border-[#FCC5C3]">
                            {courseInfo.semester}학기
                          </span>
                        )}
                        {courseInfo?.category && (
                          <span className="px-3 py-1 bg-gradient-to-r from-[#FFFBFA] to-[#FFF9F8] text-[#FBBAB7] rounded-lg font-bold border border-[#FFD4D2]">
                            {courseInfo.category}
                          </span>
                        )}
                      </div>

                      {courseInfo?.description && (
                        <p className="text-sm text-gray-600 leading-relaxed bg-white/50 rounded-lg p-3 border border-gray-100">
                          {courseInfo.description}
                        </p>
                      )}
                    </div>

                    <div className="text-center ml-6 bg-white rounded-2xl p-4 border-2 border-gray-200 shadow-sm min-w-[100px]">
                      <div className="text-xs text-gray-500 mb-2 font-medium">취득 점수</div>
                      <div className={`text-3xl font-bold bg-gradient-to-r ${getGradeColor(course.grade)} bg-clip-text text-transparent mb-1`}>
                        {gradeToScore[course.grade]?.toFixed(1) || '0.0'}
                      </div>
                      <div className="text-xs text-gray-400">/ 4.5</div>
                    </div>
                  </div>

                  {/* 선이수과목 */}
                  {hasPrerequisites && (
                    <div className="mt-4 pt-4 border-t-2 border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#EA7274] to-[#F49795] rounded-lg flex items-center justify-center">
                          <LinkIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-bold text-gray-700">선이수과목</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {courseInfo.prerequisites.map((prereq, idx) => {
                          const prereqCompleted = completedCourses.some(
                            c => (c.code || c.id) === prereq
                          );
                          
                          return (
                            <div
                              key={idx}
                              className={`px-4 py-2 rounded-xl text-sm font-bold border-2 shadow-sm transition-all ${
                                prereqCompleted
                                  ? 'bg-gradient-to-r from-[#FFF5F5] to-[#FFE8E8] text-[#EA7274] border-[#FBBAB7]'
                                  : 'bg-white text-gray-500 border-gray-300'
                              }`}
                            >
                              {prereqCompleted && <CheckCircle className="w-4 h-4 inline mr-1.5" />}
                              {prereq}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 핵심역량 */}
                  {courseInfo?.competencies && courseInfo.competencies.length > 0 && (
                    <div className="mt-4 pt-4 border-t-2 border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#FBBAB7] to-[#FCC5C3] rounded-lg flex items-center justify-center">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-bold text-gray-700">습득 역량</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {courseInfo.competencies.map((comp, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-gradient-to-r from-[#FFF9F8] to-[#FFF5F5] text-[#F49795] rounded-xl text-sm font-bold border-2 border-[#FCC5C3] shadow-sm"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseListTab;
