import React from 'react';
import JobCard from './JobCard';
import { Briefcase } from 'lucide-react';

const JobsTab = ({ liveJobs }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">실시간 채용 정보</h2>
          <p className="text-gray-600">현재 채용 중인 기업의 공고를 확인하세요</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-700">실시간 업데이트</span>
        </div>
      </div>

      <div className="space-y-4">
        {liveJobs.map((job, idx) => (
          <JobCard key={idx} job={job} />
        ))}
      </div>

      {/* 더 많은 채용 공고 보기 */}
      <div className="mt-6 text-center">
        <button className="text-[#EA7274] hover:text-[#d85d5f] font-medium text-sm flex items-center gap-2 mx-auto">
          <Briefcase className="w-4 h-4" />
          더 많은 채용 공고 보기
        </button>
      </div>
    </div>
  );
};

export default JobsTab;