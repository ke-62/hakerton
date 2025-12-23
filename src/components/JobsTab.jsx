import React from 'react';
import JobCard from './JobCard';

const JobsTab = ({ liveJobs }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">실시간 채용 공고 매칭</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          실시간 업데이트
        </div>
      </div>

      <div className="space-y-4">
        {liveJobs.map((job, idx) => (
          <JobCard key={idx} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobsTab;
