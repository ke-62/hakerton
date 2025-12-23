import React, { useState, useEffect } from 'react';
import { Target, Star, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';

const RoadmapTab = () => {
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [roadmapData, setRoadmapData] = useState(null);
    const [capabilityValues, setCapabilityValues] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 백엔드에서 학습 로드맵 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('jwtToken');
                
                if (!token) {
                    setIsLoading(false);
                    return;
                }

                // 사용자 프로필 조회
                const profileResponse = await fetch(
                    'http://172.16.72.219:3000/users/profile',
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (profileResponse.ok) {
                    const profileResult = await profileResponse.json();
                    if (profileResult.isSuccess && profileResult.result) {
                        setUserProfile(profileResult.result);
                    }
                }

                // 학습 로드맵 조회
                const roadmapResponse = await fetch(
                    'http://172.16.72.219:3000/users/profile/curriculum/semester-roadmap',
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (roadmapResponse.ok) {
                    const roadmapResult = await roadmapResponse.json();
                    if (roadmapResult.isSuccess && roadmapResult.result) {
                        setRoadmapData(roadmapResult.result);
                    }
                } else {
                    console.error('로드맵 조회 실패:', roadmapResponse.status, roadmapResponse.statusText);
                    // 404일 경우 빈 로드맵 데이터 설정
                    if (roadmapResponse.status === 404) {
                        console.log('로드맵 데이터가 아직 생성되지 않았습니다.');
                    }
                }

                // 핵심역량 조회
                const capabilityResponse = await fetch(
                    'http://172.16.72.219:3000/users/profile/my-capability-values',
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (capabilityResponse.ok) {
                    const capabilityResult = await capabilityResponse.json();
                    if (capabilityResult.isSuccess && capabilityResult.result) {
                        setCapabilityValues(capabilityResult.result.capabilityValues || []);
                        
                        // 완료된 과목 추출
                        const courses = [];
                        capabilityResult.result.capabilityValues?.forEach(cap => {
                            cap.courses?.forEach(course => {
                                if (!courses.find(c => c.courseCode === course.courseCode)) {
                                    courses.push(course);
                                }
                            });
                        });
                        setCompletedCourses(courses);
                    }
                }
            } catch (error) {
                console.error('로드맵 데이터 조회 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // AI 분석: 재수강 추천 과목 (B+ 이하 + 역량 가중치 높은 과목)
    const getRetakeCourses = () => {
        const lowGradeCourses = [];
        
        capabilityValues.forEach(capability => {
            capability.courses?.forEach(course => {
                // 학점이 3.5 이하이고 가중치가 0.5 이상인 과목
                if (course.grade <= 3.5 && course.weight >= 0.5) {
                    const gradeStr = convertScoreToGrade(course.grade);
                    lowGradeCourses.push({
                        name: course.courseName,
                        code: course.courseCode,
                        grade: gradeStr,
                        gradeScore: course.grade,
                        competency: capability.capabilityName,
                        weight: course.weight,
                        reason: `이 과목은 "${capability.capabilityName}" 역량에서 가중치 ${(course.weight * 100).toFixed(0)}%를 차지하는 핵심 과목입니다. 현재 학점 ${course.grade.toFixed(1)}점을 향상시키면 전체 역량 수치가 크게 상승합니다.`
                    });
                }
            });
        });

        // 학점 낮은 순, 가중치 높은 순으로 정렬
        return lowGradeCourses.sort((a, b) => {
            if (a.gradeScore !== b.gradeScore) return a.gradeScore - b.gradeScore;
            return b.weight - a.weight;
        }).slice(0, 5); // 상위 5개만
    };

    // 점수를 학점으로 변환
    const convertScoreToGrade = (score) => {
        if (score >= 4.5) return 'A+';
        if (score >= 4.0) return 'A';
        if (score >= 3.5) return 'B+';
        if (score >= 3.0) return 'B';
        if (score >= 2.5) return 'C+';
        if (score >= 2.0) return 'C';
        if (score >= 1.5) return 'D+';
        if (score >= 1.0) return 'D';
        return 'F';
    };

    // AI 분석: 강점/약점 역량 찾기
    const getStrengthAndWeakness = () => {
        if (capabilityValues.length === 0) return { strength: null, weakness: null };

        const sorted = [...capabilityValues].sort((a, b) => b.value - a.value);
        return {
            strength: sorted[0],
            weakness: sorted[sorted.length - 1]
        };
    };

    const lowGradeCourses = getRetakeCourses();
    const { strength, weakness } = getStrengthAndWeakness();
    const averageCapability = capabilityValues.length > 0
        ? (capabilityValues.reduce((sum, c) => sum + c.value, 0) / capabilityValues.length * 100).toFixed(0)
        : 0;

    // 학기 ID 매핑 (백엔드 semester → quarter ID)
    const semesterToQuarterId = {
        '1학기': 'q1',
        '여름학기': 'q2',
        '2학기': 'q3',
        '겨울학기': 'q4'
    };

    // 학기별 색상과 우선순위 매핑 (순서대로 진하게)
    const semesterColors = {
        '1학기': { color: 'from-[#FCC5C3] to-[#FFE0DE]', priority: 'TBC' },
        '여름학기': { color: 'from-[#FBBAB7] to-[#FCC5C3]', priority: 'LOW RISK' },
        '2학기': { color: 'from-[#F49795] to-[#FBBAB7]', priority: 'HIGH RISK' },
        '겨울학기': { color: 'from-[#EA7274] to-[#F49795]', priority: 'BAU' }
    };

    // 백엔드 데이터를 quarters 형식으로 변환
    const quarters = roadmapData?.semesters?.map(semester => {
        const semesterConfig = semesterColors[semester.semester] || semesterColors['1학기'];
        
        // 모든 과목 합치기
        const allCourses = [
            ...(semester.courseRecommendations?.essential || []).map(c => ({ ...c, type: '필수', importance: 'HIGH' })),
            ...(semester.courseRecommendations?.improvement || []).map(c => ({ ...c, type: '보완', importance: 'MEDIUM' })),
            ...(semester.courseRecommendations?.additional || []).map(c => ({ ...c, type: '추가', importance: 'LOW' }))
        ];

        return {
            id: semesterToQuarterId[semester.semester] || 'q1',
            name: semester.semester,
            period: semester.period,
            priority: semesterConfig.priority,
            color: semesterConfig.color,
            courses: allCourses.map(course => ({
                ...course,
                name: course.name,
                type: course.type,
                importance: course.importance
            }))
        };
    }) || [];

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

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-[#FBBAB7] border-t-[#EA7274] rounded-full animate-spin mb-4"></div>
                <p className="text-lg text-gray-600 font-medium">로드맵을 생성하는 중...</p>
            </div>
        );
    }

    // 로드맵 데이터가 없을 때
    if (!roadmapData || !roadmapData.semesters || roadmapData.semesters.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-200">
                <div className="text-6xl mb-6">📚</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">로드맵 데이터가 없습니다</h3>
                <p className="text-gray-600 mb-4">마이페이지에서 과목을 선택하고 저장해주세요.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* 헤더 */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <h2 className="text-3xl font-bold text-gray-800">AI 맞춤 학습 로드맵</h2>
                            {userProfile && (
                                <span className="px-4 py-2 bg-gradient-to-r from-[#FCC5C3] to-[#FBBAB7] text-white rounded-full text-sm font-bold shadow-md">
                                    {userProfile.major} {userProfile.gradeL}학년
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600">
                            {roadmapData?.desiredJob?.jobNm || '목표 직업'}으로 성장하기 위한 단계별 학습 경로
                        </p>
                    </div>
                </div>


            </div>

            {/* 학기별 추천 과목 통합 섹션 */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">학기별 추천 과목</h3>
                
                {/* 4개 학기 그리드 */}
                <div className="grid grid-cols-4 gap-6">
                    {quarters.map((quarter) => (
                        <div key={quarter.id} className="flex flex-col">
                            {/* 학기 헤더 */}
                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${quarter.color} text-white shadow-lg mb-4`}>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-lg">{quarter.name}</h3>
                                    <div className="px-2 py-1 bg-white/30 rounded-lg text-xs font-bold">
                                        {quarter.courses.length}개
                                    </div>
                                </div>
                                <p className="text-white/80 text-sm">{quarter.period}</p>
                            </div>

                            {/* 과목 리스트 */}
                            <div className="space-y-3 flex-1">
                                {quarter.courses.length === 0 ? (
                                    <div className="text-center py-8 bg-gray-50 rounded-xl">
                                        <p className="text-sm text-gray-500">추천 과목 없음</p>
                                    </div>
                                ) : (
                                    quarter.courses.map((course, idx) => (
                                        <div
                                            key={idx}
                                            className={`group p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer relative overflow-hidden`}
                                            style={{
                                                backgroundColor: 'white',
                                                borderLeft: '4px solid',
                                                borderLeftColor: quarter.id === 'q1' ? '#FCC5C3' :
                                                                quarter.id === 'q2' ? '#FBBAB7' :
                                                                quarter.id === 'q3' ? '#F49795' :
                                                                '#EA7274',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                            }}
                                        >
                                            {/* 배경 장식 */}
                                            <div 
                                                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20"
                                                style={{
                                                    backgroundColor: quarter.id === 'q1' ? '#FCC5C3' :
                                                                    quarter.id === 'q2' ? '#FBBAB7' :
                                                                    quarter.id === 'q3' ? '#F49795' :
                                                                    '#EA7274',
                                                    transform: 'translate(30%, -30%)'
                                                }}
                                            />
                                            
                                            <div className="relative">
                                                <div className="flex items-start justify-between mb-3">
                                                    <h4 
                                                        className="text-base font-bold line-clamp-2 flex-1 pr-2"
                                                        style={{
                                                            color: quarter.id === 'q1' ? '#FCC5C3' :
                                                                   quarter.id === 'q2' ? '#FBBAB7' :
                                                                   quarter.id === 'q3' ? '#F49795' :
                                                                   '#EA7274'
                                                        }}
                                                    >
                                                        {course.name}
                                                    </h4>
                                                    <span 
                                                        className="text-xs px-3 py-1 rounded-full font-bold whitespace-nowrap"
                                                        style={{
                                                            backgroundColor: quarter.id === 'q1' ? '#FFF5F5' :
                                                                           quarter.id === 'q2' ? '#FFF5F5' :
                                                                           quarter.id === 'q3' ? '#FFF5F5' :
                                                                           '#FFF0EF',
                                                            color: quarter.id === 'q1' ? '#FCC5C3' :
                                                                   quarter.id === 'q2' ? '#FBBAB7' :
                                                                   quarter.id === 'q3' ? '#F49795' :
                                                                   '#EA7274'
                                                        }}
                                                    >
                                                        {course.type}
                                                    </span>
                                                </div>
                                                
                                                <p 
                                                    className="text-sm line-clamp-2 mb-4 leading-relaxed"
                                                    style={{ color: '#6b7280' }}
                                                >
                                                    {course.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI 추천 섹션 */}
            <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8] rounded-3xl border-2 border-[#FBBAB7] p-8 shadow-lg">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#EA7274] to-[#F49795] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                        <Target className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-2xl mb-4 flex items-center gap-2">
                            AI 분석 결과
                            <span className="text-sm font-normal text-gray-600">({completedCourses.length}개 과목 기반)</span>
                        </h3>
                        
                        {capabilityValues.length > 0 ? (
                            <div className="space-y-4">
                                {/* 전체 역량 평균 */}
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#FBBAB7]/30">
                                    <div className="flex items-center gap-3 mb-3">
                                        <TrendingUp className="w-5 h-5 text-[#EA7274]" />
                                        <span className="font-bold text-gray-800">전체 역량 수준</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                                                <div 
                                                    className="bg-gradient-to-r from-[#EA7274] to-[#F49795] h-full rounded-full transition-all"
                                                    style={{ width: `${averageCapability}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <span className="text-3xl font-bold bg-gradient-to-r from-[#EA7274] to-[#F49795] bg-clip-text text-transparent">
                                            {averageCapability}%
                                        </span>
                                    </div>
                                </div>

                                {/* 강점 */}
                                {strength && (
                                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-green-200">
                                        <p className="text-gray-700 leading-relaxed">
                                            <span className="font-bold text-green-700">💪 현재 강점:</span> <strong>{strength.capabilityName}</strong> 역량이 우수합니다 
                                            <span className="ml-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                                                {Math.round(strength.value * 100)}%
                                            </span>
                                        </p>
                                    </div>
                                )}

                                {/* 약점 */}
                                {weakness && weakness.value < 0.6 && (
                                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-orange-200">
                                        <p className="text-gray-700 leading-relaxed">
                                            <span className="font-bold text-orange-700">📈 보완 필요:</span> <strong>{weakness.capabilityName}</strong> 분야에서 가장 큰 성장 기회가 있습니다 
                                            <span className="ml-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-bold">
                                                {Math.round(weakness.value * 100)}%
                                            </span>
                                        </p>
                                    </div>
                                )}

                                {/* 재수강 추천 요약 */}
                                {lowGradeCourses.length > 0 && (
                                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-amber-200">
                                        <p className="text-gray-700 leading-relaxed">
                                            <span className="font-bold text-amber-700">⚠️ 주의:</span> <strong>{lowGradeCourses.length}개 과목</strong>이 재수강 추천 대상입니다. 
                                            이 과목들의 학점을 향상시키면 전체 역량이 크게 상승할 수 있습니다.
                                        </p>
                                    </div>
                                )}

                                {/* 종합 분석 */}
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-blue-200">
                                    <p className="text-gray-700 leading-relaxed">
                                        <span className="font-bold text-blue-700">🎯 종합 분석:</span> 총 <strong>{completedCourses.length}개 과목</strong>을 이수하였으며, 
                                        평균 역량 수치는 <strong>{averageCapability}%</strong>입니다. 
                                        {averageCapability >= 80 && ' 매우 우수한 수준입니다!'}
                                        {averageCapability >= 60 && averageCapability < 80 && ' 양호한 수준이며 추가 학습으로 더 성장할 수 있습니다.'}
                                        {averageCapability < 60 && ' 핵심 역량 강화를 위한 추가 학습을 권장합니다.'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 text-center">
                                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-600">과목을 선택하고 저장하면 AI 분석 결과가 표시됩니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 재수강 추천 섹션 */}
            {lowGradeCourses.length > 0 && (
                <div className="bg-white rounded-3xl border-2 border-amber-200 shadow-lg p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-md">
                            <Star className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-2xl">재수강 추천 과목</h3>
                            <p className="text-gray-600 text-sm">핵심 역량 향상을 위해 학점 개선이 필요한 과목입니다</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {lowGradeCourses.map((course, idx) => (
                            <div
                                key={idx}
                                className="p-6 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-lg group-hover:text-amber-700 transition-colors">
                                                {course.name}
                                            </h4>
                                            <span className="text-sm text-gray-600">{course.code}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${
                                            course.gradeScore < 2.0
                                                ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-2 border-red-300'
                                                : course.gradeScore < 3.0
                                                ? 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border-2 border-orange-300'
                                                : 'bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-700 border-2 border-amber-300'
                                        }`}>
                                            {course.grade} ({course.gradeScore.toFixed(1)})
                                        </span>
                                        <span className="px-4 py-2 bg-white rounded-xl text-sm font-bold text-gray-700 border-2 border-gray-200 shadow-sm">
                                            {course.competency}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-200 mb-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <p className="text-gray-700 font-medium mb-2">
                                                <strong className="text-amber-700">재수강 추천 이유</strong>
                                            </p>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {course.reason}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className="w-5 h-5 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-700">역량 기여도</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-white rounded-lg px-4 py-2 border border-blue-300">
                                            <span className="text-lg font-bold text-blue-600">{(course.weight * 100).toFixed(0)}%</span>
                                        </div>
                                        <span className="text-xs text-gray-600">가중치</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-700 leading-relaxed">
                                <strong className="text-blue-700">💡 참고:</strong> 위 추천은 이수한 과목의 학점과 각 역량에 대한 기여도를 분석하여 생성되었습니다. 
                                재수강 여부는 개인의 학습 목표와 상황에 따라 결정하시기 바랍니다.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* 재수강 대상 없을 때 */}
            {lowGradeCourses.length === 0 && capabilityValues.length > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border-2 border-green-200 p-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-md">
                            <Star className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-2xl mb-2">훌륭합니다! 🎉</h3>
                            <p className="text-gray-700">모든 과목을 우수한 성적으로 이수하셨습니다. 재수강이 필요한 과목이 없습니다.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoadmapTab;