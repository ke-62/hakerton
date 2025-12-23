import React from 'react';
import { X, TrendingUp, Award, Users, BookOpen } from 'lucide-react';

const JobDetailModal = ({ onClose, job }) => {
    if (!job) return null;

    console.log('🎯🎯🎯 모달로 전달된 job 객체 전체:', JSON.stringify(job, null, 2));
    console.log('🎯 job.name:', job.name);
    console.log('🎯 job.mainTasks 타입:', typeof job.mainTasks);
    console.log('🎯 job.mainTasks Array.isArray:', Array.isArray(job.mainTasks));
    console.log('🎯 job.mainTasks 길이:', job.mainTasks?.length);
    console.log('🎯 job.mainTasks 내용:', job.mainTasks);
    console.log('🎯 job.skills 타입:', typeof job.skills);
    console.log('🎯 job.skills Array.isArray:', Array.isArray(job.skills));
    console.log('🎯 job.skills 길이:', job.skills?.length);
    console.log('🎯 job.skills 내용:', job.skills);

    // 백엔드 데이터 구조에서 필요한 정보 추출
    // mainTasks와 requiredCapabilities는 job에 직접 있음
    const mainTasks = job.mainTasks || [];
    const skills = job.skills || [];
    const education = job.fullDetails?.education || {};
    const salary = job.salary || '정보 없음';
    const prospect = job.prospect || '보통';
    const jobProspectDetail = job.fullDetails?.jobProspect || '';
    const jobSatisfaction = job.jobSatisfaction || '';

    console.log('🔍 최종 mainTasks:', mainTasks, '길이:', mainTasks.length);
    console.log('🔍 최종 skills:', skills, '길이:', skills.length);

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
                    {mainTasks.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <BookOpen className="w-5 h-5 text-[#EA7274]" />
                                <h3 className="text-xl font-bold text-gray-800">주요 업무</h3>
                            </div>
                            <ul className="space-y-2">
                                {mainTasks.map((task, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#EA7274] rounded-full mt-2 flex-shrink-0"></span>
                                        <span className="text-gray-700">{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* 필요 역량 */}
                    {skills.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Award className="w-5 h-5 text-[#EA7274]" />
                                <h3 className="text-xl font-bold text-gray-800">필요 역량</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 bg-[#FFF5F5] border border-[#FBBAB7] rounded-full text-sm font-medium text-gray-700"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 평균 연봉 & 전망 */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="w-5 h-5 text-[#EA7274]" />
                                <h3 className="text-xl font-bold text-gray-800">평균 연봉</h3>
                            </div>
                            <p className="text-2xl font-bold text-[#EA7274]">{salary}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Award className="w-5 h-5 text-[#EA7274]" />
                                <h3 className="text-xl font-bold text-gray-800">직업 전망</h3>
                            </div>
                            <p className={`text-2xl font-bold ${
                                prospect === '좋음' ? 'text-green-600' :
                                prospect === '나쁨' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                                {prospect}
                            </p>
                        </div>
                    </div>

                    {/* 전망 상세 설명 */}
                    {jobProspectDetail && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="w-5 h-5 text-[#EA7274]" />
                                <h3 className="text-xl font-bold text-gray-800">전망 상세</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{jobProspectDetail}</p>
                        </div>
                    )}

                    {/* 관련 자격증 */}
                    {education.certifications && education.certifications.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Users className="w-5 h-5 text-[#EA7274]" />
                                <h3 className="text-xl font-bold text-gray-800">관련 자격증</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {education.certifications.map((cert, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700"
                                    >
                                        {cert.certNm}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 관련 학과 */}
                    {education.majors && education.majors.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <BookOpen className="w-5 h-5 text-[#EA7274]" />
                                <h3 className="text-xl font-bold text-gray-800">관련 학과</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {education.majors.map((major, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 bg-[#FFF5F5] border border-[#FBBAB7] rounded-lg text-sm text-gray-700"
                                    >
                                        {major.majorNm}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobDetailModal;
