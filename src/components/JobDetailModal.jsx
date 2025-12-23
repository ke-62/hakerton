import React from 'react';
import { X, TrendingUp, Award, Users, BookOpen } from 'lucide-react';

const JobDetailModal = ({ onClose, job }) => {
    if (!job) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden">
                {/* 헤더 */}
                <div className="relative p-8 bg-gradient-to-br from-[#FFF9F5] via-[#FFF5F5] to-[#FFE8E8] border-b border-[#FBBAB7]/30">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-5xl">{job.icon}</div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-1">{job.name}</h2>
                            <p className="text-gray-600">{job.category}</p>
                        </div>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed">{job.description}</p>
                </div>

                {/* 콘텐츠 */}
                <div className="p-8 overflow-y-auto max-h-[calc(85vh-220px)]">
                    {/* 주요 업무 */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-5 h-5 text-[#EA7274]" />
                            <h3 className="text-xl font-bold text-gray-800">주요 업무</h3>
                        </div>
                        <ul className="space-y-2">
                            {job.tasks.map((task, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#EA7274] rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="text-gray-700">{task}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 필요 역량 */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Award className="w-5 h-5 text-[#EA7274]" />
                            <h3 className="text-xl font-bold text-gray-800">필요 역량</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1.5 bg-[#FFF5F5] border border-[#FBBAB7] rounded-full text-sm font-medium text-gray-700"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 평균 연봉 */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-5 h-5 text-[#EA7274]" />
                            <h3 className="text-xl font-bold text-gray-800">평균 연봉</h3>
                        </div>
                        <p className="text-2xl font-bold text-[#EA7274]">{job.salary}</p>
                    </div>

                    {/* 채용 기업 */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-5 h-5 text-[#EA7274]" />
                            <h3 className="text-xl font-bold text-gray-800">주요 채용 기업</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {job.companies.map((company, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700"
                                >
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailModal;
