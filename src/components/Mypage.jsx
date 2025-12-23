import React, { useState, useEffect } from 'react';
import { X, Check, BookOpen, Save, List } from 'lucide-react';
import SkillTreeTab from './SkillTreeTab';
import CourseListTab from './CourseListTab';

const MyPage = ({ onClose, userCourses, setUserCourses, allSkillTree, selectedCourse, setSelectedCourse }) => {
    const [availableCourses, setAvailableCourses] = useState([]);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [capabilityValues, setCapabilityValues] = useState([]);
    const [isLoadingCapabilities, setIsLoadingCapabilities] = useState(false);

    const gradeOptions = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];

    const [activeTab, setActiveTab] = useState('courses');
    const [filteredSkillTree, setFilteredSkillTree] = useState([]);

    // 콘솔 명령어: 마이페이지 초기화
    useEffect(() => {
        window.resetMypage = () => {
            setUserCourses([]);
            setCapabilityValues([]);
            setActiveTab('courses');
            setAvailableCourses(prev => prev.map(c => ({ ...c, selected: false, grade: 'A+' })));
            localStorage.removeItem('userCourses'); // localStorage에서도 삭제
            console.log('✅ 마이페이지가 초기화되었습니다!');
            console.log('📌 사용 가능한 명령어:');
            console.log('  - window.resetMypage() : 과목 선택 초기화');
            console.log('  - window.clearAllData() : 전체 데이터 초기화 (로그인 정보 포함)');
        };

        window.clearAllData = () => {
            if (window.confirm('⚠️ 모든 데이터(로그인 정보 포함)가 삭제됩니다. 계속하시겠습니까?')) {
                localStorage.clear();
                console.log('🗑️ 모든 데이터가 삭제되었습니다. 페이지를 새로고침합니다...');
                setTimeout(() => window.location.reload(), 1000);
            }
        };

        // 초기 안내 메시지
        console.log('🎓 마이페이지 콘솔 명령어가 활성화되었습니다!');
        console.log('📌 사용 가능한 명령어:');
        console.log('  - window.resetMypage() : 과목 선택 초기화');
        console.log('  - window.clearAllData() : 전체 데이터 초기화 (로그인 정보 포함)');

        return () => {
            delete window.resetMypage;
            delete window.clearAllData;
        };
    }, [setUserCourses]);

    // 학점별 색상 가져오기
    const getGradeColor = (grade) => {
        const gradeColors = {
            'A+': 'from-[#EA7274] to-[#F49795]',
            'A': 'from-[#F49795] to-[#FBBAB7]',
            'B+': 'from-[#FBBAB7] to-[#FCC5C3]',
            'B': 'from-[#FCC5C3] to-[#FFD4D2]',
            'C+': 'from-[#FFD4D2] to-[#FFE0DE]',
            'C': 'from-[#FFE0DE] to-[#FFF0EF]',
            'D+': 'from-gray-300 to-gray-400',
            'D': 'from-gray-400 to-gray-500',
            'F': 'from-gray-500 to-gray-600'
        };
        return gradeColors[grade] || 'from-gray-400 to-gray-500';
    };

    // 백엔드에서 과목 목록 가져오기
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoadingCourses(true);
                const token = localStorage.getItem('jwtToken');
                const userMajor = localStorage.getItem('userMajor');

                if (!token) {
                    alert('로그인이 필요합니다.');
                    return;
                }

                const response = await fetch(
                    'http://172.16.72.219:3000/users/profile/curriculum/departments',
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error('과목 목록을 불러오는데 실패했습니다.');
                }

                const data = await response.json();

                if (data.isSuccess && data.result?.curriculum?.courses) {
                    // 백엔드 응답 구조: result.curriculum.courses
                    const courses = data.result.curriculum.courses.map(course => ({
                        id: course.code, // code를 id로 사용
                        code: course.code,
                        name: course.name,
                        credits: course.credits,
                        semester: course.semester,
                        category: course.category,
                        selected: false,
                        grade: 'A+'
                    }));
                    
                    setAvailableCourses(courses);
                } else {
                    throw new Error(data.message || '과목 데이터 형식이 올바르지 않습니다.');
                }
            } catch (error) {
                console.error('과목 목록 조회 실패:', error);
                alert('과목 목록을 불러오는데 실패했습니다. 다시 시도해주세요.');
            } finally {
                setIsLoadingCourses(false);
            }
        };

        fetchCourses();
    }, []);

    // userCourses가 변경되면 필터링된 스킬 트리 업데이트
    useEffect(() => {
        if (userCourses && userCourses.length > 0) {
            const selectedIds = userCourses.map(c => c.id);
            const filtered = allSkillTree.filter(skill => selectedIds.includes(skill.id));
            setFilteredSkillTree(filtered);
        } else {
            setFilteredSkillTree([]);
        }
    }, [userCourses, allSkillTree]);

    // availableCourses 로드 완료 후 userCourses로 복원 (나갔다 들어와도 유지)
    useEffect(() => {
        if (availableCourses.length > 0 && userCourses && userCourses.length > 0) {
            // 이미 복원된 상태인지 확인 (무한 루프 방지)
            const hasSelectedCourses = availableCourses.some(c => c.selected);
            
            if (!hasSelectedCourses) {
                console.log('💾 저장된 과목 복원 중...', userCourses.length + '개');
                setAvailableCourses(prev =>
                    prev.map(course => {
                        const userCourse = userCourses.find(uc => 
                            uc.id === course.id || 
                            uc.code === course.code || 
                            uc.id === course.code
                        );
                        if (userCourse) {
                            console.log('✅ 복원:', course.name, userCourse.grade);
                        }
                        return userCourse 
                            ? { ...course, selected: true, grade: userCourse.grade || 'A+' }
                            : course;
                    })
                );
            }
        }
    }, [availableCourses.length, userCourses]);

    const toggleCourse = (courseId) => {
        setAvailableCourses(prev =>
            prev.map(course =>
                course.id === courseId ? { ...course, selected: !course.selected } : course
            )
        );
    };

    const handleGradeChange = (courseId, newGrade) => {
        setAvailableCourses(prev =>
            prev.map(course =>
                course.id === courseId ? { ...course, grade: newGrade } : course
            )
        );
    };

    // 학점을 숫자로 변환하는 함수
    const convertGradeToScore = (grade) => {
        const gradeMap = {
            'A+': 4.5,
            'A': 4.0,
            'B+': 3.5,
            'B': 3.0,
            'C+': 2.5,
            'C': 2.0,
            'D+': 1.5,
            'D': 1.0,
            'F': 0.0
        };
        return gradeMap[grade] || 0.0;
    };

    const handleSave = async () => {
        const selected = availableCourses.filter(c => c.selected);

        if (selected.length === 0) {
            alert('최소 1개 이상의 과목을 선택해주세요.');
            return;
        }

        try {
            setIsSaving(true);
            const token = localStorage.getItem('jwtToken');
            
            if (!token) {
                alert('로그인이 필요합니다.');
                return;
            }

            // 학점을 점수로 변환하여 courseGrades 객체 생성
            const courseGrades = {};
            selected.forEach(course => {
                const courseCode = course.code || course.id;
                courseGrades[courseCode] = convertGradeToScore(course.grade);
            });

            // 백엔드에 과목별 성적 전송 (PATCH academic-info)
            const response = await fetch('http://172.16.72.219:3000/users/profile/academic-info', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseGrades: courseGrades
                })
            });

            const data = await response.json();

            if (response.ok && data.isSuccess) {
                // 백엔드 저장 성공
                setUserCourses(selected);
                alert('수강 과목이 저장되었습니다! (' + selected.length + '개 과목)');
                
                // 핵심역량 조회
                await fetchCapabilityValues();
                
                // 스킬트리 탭으로 이동
                setActiveTab('skilltree');
            } else {
                throw new Error(data.message || '저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('과목 저장 실패:', error);
            alert('과목 저장에 실패했습니다: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleRechooseCourses = () => {
        setActiveTab('courses');
    };

    // 핵심역량 조회 함수
    const fetchCapabilityValues = async () => {
        try {
            setIsLoadingCapabilities(true);
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                throw new Error('로그인 토큰이 없습니다.');
            }

            const response = await fetch(
                'http://172.16.72.219:3000/users/profile/my-capability-values',
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`핵심역량 조회 실패: ${response.status}`);
            }

            const data = await response.json();

            if (data.isSuccess && data.result?.capabilityValues) {
                setCapabilityValues(data.result.capabilityValues);
            } else {
                console.error('핵심역량 데이터가 없습니다:', data);
            }
        } catch (error) {
            console.error('핵심역량 조회 실패:', error);
        } finally {
            setIsLoadingCapabilities(false);
        }
    };

    // 평균 학점 계산 함수
    const calculateGPA = () => {
        const selected = availableCourses.filter(c => c.selected);
        if (selected.length === 0) return '0.00';

        const gradePoints = {
            'A+': 4.5, 'A': 4.0, 'B+': 3.5, 'B': 3.0,
            'C+': 2.5, 'C': 2.0, 'D+': 1.5, 'D': 1.0, 'F': 0.0
        };

        const totalPoints = selected.reduce((sum, course) => {
            return sum + (gradePoints[course.grade] || 0);
        }, 0);

        return (totalPoints / selected.length).toFixed(2);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                {/* 헤더 */}
                <div className="bg-gradient-to-r from-[#FBBAB7] to-[#F49795] p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">마이페이지</h2>
                        <p className="text-white/80 text-sm mt-1">수강 과목과 학점을 선택하고 스킬 트리를 확인하세요</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* 탭 네비게이션 */}
                <div className="border-b border-gray-200 bg-gray-50">
                    <div className="flex gap-2 p-4">
                        <button
                            onClick={() => setActiveTab('courses')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'courses'
                                    ? 'bg-gradient-to-r from-[#FBBAB7] to-[#F49795] text-white shadow-lg'
                                    : 'text-gray-600 hover:bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                수강 과목 선택
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('skilltree')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'skilltree'
                                    ? 'bg-gradient-to-r from-[#FBBAB7] to-[#F49795] text-white shadow-lg'
                                    : 'text-gray-600 hover:bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Check className="w-5 h-5" />
                                스킬 트리
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('courselist')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'courselist'
                                    ? 'bg-gradient-to-r from-[#FBBAB7] to-[#F49795] text-white shadow-lg'
                                    : 'text-gray-600 hover:bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <List className="w-5 h-5" />
                                과목 확인 ({userCourses.length})
                            </div>
                        </button>
                    </div>
                </div>

                {/* 컨텐츠 */}
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                    {activeTab === 'courses' ? (
                        <div className="p-8">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">수강한 과목과 학점을 선택해주세요</h3>
                                <p className="text-gray-600 text-sm">
                                    선택한 과목과 학점을 바탕으로 맞춤형 스킬 트리와 로드맵이 생성됩니다.
                                </p>
                            </div>

                            {/* 로딩 상태 */}
                            {isLoadingCourses ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="w-16 h-16 border-4 border-[#FBBAB7] border-t-[#EA7274] rounded-full animate-spin mb-4"></div>
                                    <p className="text-lg text-gray-600 font-medium">과목 목록을 불러오는 중...</p>
                                </div>
                            ) : availableCourses.length === 0 ? (
                                <div className="bg-gray-50 rounded-xl p-12 text-center">
                                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">과목 목록이 없습니다</h3>
                                    <p className="text-gray-600">백엔드에서 과목 데이터를 확인해주세요.</p>
                                </div>
                            ) : (
                                <>
                                    {/* 학점 범례 */}
                                    <div className="mb-6 p-6 bg-gray-50 rounded-xl">
                                        <h4 className="font-bold text-gray-800 mb-3">학점 가이드</h4>
                                        <div className="grid grid-cols-9 gap-2">
                                            {gradeOptions.map(grade => (
                                                <div key={grade} className="text-center">
                                                    <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${getGradeColor(grade)} mb-1`}></div>
                                                    <span className="text-xs font-medium text-gray-600">{grade}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">{availableCourses.map((course) => (
                                    <div
                                        key={course.id}
                                        className={`p-4 rounded-xl border-2 transition-all ${course.selected
                                                ? 'border-[#FBBAB7] bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8]'
                                                : 'border-gray-200 bg-white hover:border-[#FBBAB7]/50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <button
                                                onClick={() => toggleCourse(course.id)}
                                                className="flex items-center gap-3 flex-1"
                                            >
                                                <span className="font-medium text-gray-800 text-lg">{course.name}</span>
                                                {course.selected && (
                                                    <div className="w-6 h-6 bg-[#EA7274] rounded-full flex items-center justify-center flex-shrink-0">
                                                        <Check className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                            </button>
                                        </div>

                                        {/* 학점 선택 드롭다운 */}
                                        {course.selected && (
                                            <div className="mt-3 pt-3 border-t border-gray-200">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    취득 학점
                                                </label>
                                                <select
                                                    value={course.grade}
                                                    onChange={(e) => handleGradeChange(course.id, e.target.value)}
                                                    className={`w-full px-4 py-2 rounded-lg border border-[#FBBAB7]/30 bg-gradient-to-r ${getGradeColor(course.grade)} text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#FBBAB7]/50 shadow-sm transition-all`}
                                                >
                                                    {gradeOptions.map(grade => (
                                                        <option key={grade} value={grade}>
                                                            {grade}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {!isLoadingCourses && availableCourses.length > 0 && (
                        <div className="mt-8 flex items-center justify-between p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-amber-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-lg">
                                        {availableCourses.filter(c => c.selected).length}개 과목 선택됨
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        평균 학점: <span className="font-bold text-amber-600">{calculateGPA()}</span> / 4.5
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={isSaving || availableCourses.filter(c => c.selected).length === 0}
                                className="px-8 py-4 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] hover:from-[#F49795] hover:to-[#EA7274] text-white rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <Save className="w-5 h-5" />
                                {isSaving ? '저장 중...' : '저장하기'}
                            </button>
                        </div>
                    )}
                        </div>
                    ) : activeTab === 'skilltree' ? (
                        <div className="p-8">
                            {capabilityValues.length > 0 ? (
                                <SkillTreeTab
                                    capabilityValues={capabilityValues}
                                    isLoadingCapabilities={isLoadingCapabilities}
                                    selectedCourse={selectedCourse}
                                    setSelectedCourse={setSelectedCourse}
                                    onRechooseCourses={handleRechooseCourses}
                                />
                            ) : (
                                <div className="bg-gray-50 rounded-2xl p-12 text-center">
                                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">수강 과목을 먼저 선택해주세요</h3>
                                    <p className="text-gray-600 mb-6">
                                        수강 과목 선택 탭에서 과목을 선택하고 저장하면<br />
                                        여기에 스킬 트리가 표시됩니다.
                                    </p>
                                    <button
                                        onClick={() => setActiveTab('courses')}
                                        className="px-6 py-3 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] hover:from-[#F49795] hover:to-[#EA7274] text-white rounded-xl font-bold shadow-lg transition-all"
                                    >
                                        과목 선택하러 가기
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-8">
                            <CourseListTab
                                completedCourses={userCourses}
                                allCourses={availableCourses}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPage;