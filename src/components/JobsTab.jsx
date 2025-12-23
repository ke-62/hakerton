import React, { useState } from 'react';
import { Briefcase, TrendingUp, Award, Sparkles } from 'lucide-react';
import JobDetailModal from './JobDetailModal';

const JobsTab = ({ careerJobs }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="py-6">
      {/* 헤더 섹션 - 더 화려하게 */}
      <div className="bg-gradient-to-br from-[#FFF5F5] via-white to-[#FFF9F5] rounded-3xl border-2 border-[#FBBAB7]/30 p-8 mb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#FBBAB7] to-[#F49795] rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">나의 전공 관련 직업</h2>
            <p className="text-gray-600">컴퓨터공학과 졸업생들이 선택하는 다양한 진로를 탐색해보세요</p>
          </div>
        </div>

        {/* 통계 정보 */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 border border-[#FBBAB7]/20">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-[#EA7274]" />
              <span className="text-2xl font-bold text-gray-800">{careerJobs.length}</span>
            </div>
            <p className="text-sm text-gray-600">추천 직업</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#FBBAB7]/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-[#EA7274]" />
              <span className="text-2xl font-bold text-gray-800">85%</span>
            </div>
            <p className="text-sm text-gray-600">취업률</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#FBBAB7]/20">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-[#EA7274]" />
              <span className="text-2xl font-bold text-gray-800">상위 10%</span>
            </div>
            <p className="text-sm text-gray-600">연봉 수준</p>
          </div>
        </div>
      </div>

      {/* 직업 카드 그리드 - 더 크고 화려하게 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {careerJobs.map((job) => (
          <div
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className="group cursor-pointer bg-white hover:bg-gradient-to-br hover:from-[#FFF9F5] hover:to-[#FFF5F5] border-2 border-gray-200 hover:border-[#FBBAB7] rounded-3xl p-8 transition-all shadow-md hover:shadow-2xl hover:scale-[1.02] duration-300"
          >
            {/* 상단: 아이콘과 카테고리 */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-5xl">{job.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#EA7274] transition-colors">
                    {job.name}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-[#FFF5F5] to-[#FFE8E8] border border-[#FBBAB7] rounded-full text-sm font-medium text-[#EA7274]">
                  <Award className="w-3 h-3" />
                  {job.category}
                </span>
              </div>
            </div>

            {/* 설명 */}
            <p className="text-gray-700 text-base mb-6 leading-relaxed line-clamp-3">{job.description}</p>

            {/* 주요 정보 */}
            <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8] rounded-xl p-4 border border-[#FBBAB7]/30 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">연봉</p>
                  <p className="text-xl font-bold text-[#EA7274]">{job.salary}</p>
                </div>
              </div>
            </div>

            {/* 스킬 태그 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {job.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-medium"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 4 && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-[#FBBAB7]/20 to-[#F49795]/20 border border-[#FBBAB7] rounded-lg text-sm text-[#EA7274] font-bold">
                  +{job.skills.length - 4}
                </span>
              )}
            </div>

            {/* 더보기 버튼 */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-[#EA7274] font-bold text-base group-hover:gap-3 transition-all">
                <Briefcase className="w-5 h-5" />
                <span>상세 정보 보기</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 직업 상세 모달 */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default JobsTab;