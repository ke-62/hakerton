import React from 'react';
import { formatDeadline } from '../utils/helpers';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white hover:shadow-lg border border-gray-100 rounded-2xl p-6 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl flex items-center justify-center border border-red-100 text-3xl">
            {job.logo}
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-800 mb-1">{job.company}</h3>
            <p className="text-gray-600">{job.position}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {job.requiredSkills.map((skill, i) => (
          <span key={i} className="px-3 py-1 bg-red-50 border border-red-200 rounded-full text-sm text-gray-700">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm">
          <span className="text-gray-500">모집 중: </span>
          <span className="text-red-600 font-medium">{formatDeadline(job.deadline)}</span>
        </div>
        <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-lg font-medium transition-all shadow-sm">
          채용공고 보기
        </button>
      </div>
    </div>
  );
};

export default JobCard;
