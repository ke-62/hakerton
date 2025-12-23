import React, { useState } from 'react';
import { Target, Star, ArrowRight } from 'lucide-react';

const RoadmapTab = () => {
    const [selectedQuarter, setSelectedQuarter] = useState(null);

    const roadmapData = {
        quarters: [
            {
                id: 'q1',
                name: '1학기',
                period: '2024.03 - 2024.06',
                priority: 'TBC',
                color: 'from-[#FBBAB7] to-[#F49795]',
                courses: [
                    { name: '데이터베이스 고급', type: '필수', importance: 'HIGH' },
                    { name: '시스템 설계', type: '추천', importance: 'HIGH' }
                ]
            },
            {
                id: 'q2',
                name: '여름학기',
                period: '2024.07 - 2024.08',
                priority: 'LOW RISK',
                color: 'from-[#F49795] to-[#EA7274]',
                courses: [
                    { name: '인턴십 준비', type: '추천', importance: 'MEDIUM' },
                    { name: '프로젝트 심화', type: '선택', importance: 'MEDIUM' }
                ]
            },
            {
                id: 'q3',
                name: '2학기',
                period: '2024.09 - 2024.12',
                priority: 'HIGH RISK',
                color: 'from-[#EA7274] to-[#d85d5f]',
                courses: [
                    { name: '클라우드 아키텍처', type: '필수', importance: 'HIGH' },
                    { name: 'MSA 설계', type: '필수', importance: 'HIGH' },
                    { name: '보안 프로그래밍', type: '추천', importance: 'MEDIUM' }
                ]
            },
            {
                id: 'q4',
                name: '겨울학기',
                period: '2025.01 - 2025.02',
                priority: 'BAU',
                color: 'from-gray-400 to-gray-500',
                courses: [
                    { name: '취업 준비', type: '필수', importance: 'HIGH' },
                    { name: '포트폴리오 완성', type: '필수', importance: 'HIGH' }
                ]
            }
        ],
        tracks: [
            {
                name: '핵심 역량',
                items: [
                    { quarter: 'q1', title: '백엔드 심화', desc: 'Spring Boot Advanced' },
                    { quarter: 'q2', title: '실무 경험', desc: '인턴십/프로젝트' },
                    { quarter: 'q3', title: '시스템 설계', desc: '아키텍처 설계 능력' },
                    { quarter: 'q4', title: '취업 완성', desc: '면접 준비 완료' }
                ]
            },
            {
                name: '기술 스택',
                items: [
                    { quarter: 'q1', title: 'Database', desc: 'MySQL, PostgreSQL' },
                    { quarter: 'q2', title: 'DevOps', desc: 'Docker, K8s 기초' },
                    { quarter: 'q3', title: 'Cloud', desc: 'AWS/GCP 실습' },
                    { quarter: 'q4', title: 'Production', desc: '배포 자동화' }
                ]
            },
            {
                name: '포트폴리오',
                items: [
                    { quarter: 'q1', title: '프로젝트 1', desc: 'RESTful API 서버' },
                    { quarter: 'q2', title: '프로젝트 2', desc: '마이크로서비스' },
                    { quarter: 'q3', title: '프로젝트 3', desc: '클라우드 배포' },
                    { quarter: 'q4', title: '완성', desc: '기술 블로그 운영' }
                ]
            }
        ]
    };

    const priorityColors = {
        'TBC': 'bg-[#FBBAB7]',
        'LOW RISK': 'bg-[#F49795]',
        'HIGH RISK': 'bg-[#EA7274]',
        'BAU': 'bg-gray-500'
    };

    const importanceColors = {
        'HIGH': 'text-[#EA7274] bg-red-50 border-[#EA7274]/30',
        'MEDIUM': 'text-amber-600 bg-amber-50 border-amber-200',
        'LOW': 'text-green-600 bg-green-50 border-green-200'
    };

    return (
        <div className="space-y-8">
            {/* 헤더 */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">AI 맞춤 학습 로드맵</h2>
                        <p className="text-gray-600">백엔드 개발자로 성장하기 위한 단계별 학습 경로</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] rounded-full">
                            <Star className="w-5 h-5 text-white" />
                            <span className="text-white font-bold">목표 달성률 72%</span>
                        </div>
                    </div>
                </div>

                {/* 범례 */}
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-600">우선순위:</span>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FBBAB7]"></div>
                            <span className="text-sm text-gray-700">계획 단계</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#F49795]"></div>
                            <span className="text-sm text-gray-700">낮은 난이도</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#EA7274]"></div>
                            <span className="text-sm text-gray-700">높은 난이도</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                            <span className="text-sm text-gray-700">일반 유지</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 타임라인 로드맵 */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                {/* 분기 헤더 */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {roadmapData.quarters.map((quarter) => (
                        <div
                            key={quarter.id}
                            className={`relative p-4 rounded-2xl bg-gradient-to-br ${quarter.color} text-white shadow-lg cursor-pointer transition-transform hover:scale-105`}
                            onClick={() => setSelectedQuarter(quarter.id)}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-lg">{quarter.name}</h3>
                                <div className={`px-2 py-1 ${priorityColors[quarter.priority]} rounded-lg text-xs font-bold`}>
                                    {quarter.priority}
                                </div>
                            </div>
                            <p className="text-white/80 text-sm">{quarter.period}</p>
                        </div>
                    ))}
                </div>

                {/* 트랙별 로드맵 */}
                {roadmapData.tracks.map((track, trackIdx) => (
                    <div key={trackIdx} className="mb-8 last:mb-0">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] rounded-full"></div>
                            <h3 className="font-bold text-gray-800 text-lg">{track.name}</h3>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {track.items.map((item, itemIdx) => {
                                const quarter = roadmapData.quarters.find(q => q.id === item.quarter);
                                return (
                                    <div
                                        key={itemIdx}
                                        className={`relative p-6 border-2 rounded-2xl transition-all ${selectedQuarter === item.quarter
                                            ? 'border-[#FBBAB7] bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8] shadow-lg scale-105'
                                            : 'border-gray-200 bg-white hover:border-[#FBBAB7]/50'
                                            }`}
                                    >
                                        {itemIdx > 0 && (
                                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] rounded-full flex items-center justify-center z-10">
                                                <ArrowRight className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r ${quarter.color} text-white`}>
                                                {quarter.name}
                                            </div>
                                            <h4 className="font-bold text-gray-800">{item.title}</h4>
                                            <p className="text-sm text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* 분기별 상세 정보 */}
            <div className="grid grid-cols-4 gap-4">
                {roadmapData.quarters.map((quarter) => (
                    <div
                        key={quarter.id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                    >
                        <h4 className="font-bold text-gray-800 mb-4">{quarter.name} 추천 과목</h4>
                        <div className="space-y-3">
                            {quarter.courses.map((course, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded-xl border ${importanceColors[course.importance]}`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium">{course.name}</span>
                                        <span className="text-xs px-2 py-1 bg-white rounded-full">
                                            {course.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* AI 추천 섹션 */}
            <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8] rounded-3xl border border-[#FBBAB7] p-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-xl mb-3">AI 분석 결과</h3>
                        <div className="space-y-2 text-gray-700">
                            <p>• <strong>현재 강점:</strong> 웹 개발 역량이 우수합니다 (90점)</p>
                            <p>• <strong>보완 필요:</strong> AI/ML 분야에서 가장 큰 성장 기회가 있습니다 (40점)</p>
                            <p>• <strong>우선 추천:</strong> 1학기에 '시스템 설계' 과목을 이수하면 목표 직무 매칭률이 87%로 상승합니다</p>
                            <p>• <strong>장기 목표:</strong> 2학기까지 클라우드 관련 과목을 이수하면 대기업 백엔드 포지션 지원이 가능합니다</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadmapTab;