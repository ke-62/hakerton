import React, { useState, useEffect } from 'react';
import { X, Check, BookOpen, Save } from 'lucide-react';
import SkillTreeTab from './SkillTreeTab';

const MyPage = ({ onClose, userCourses, setUserCourses, allSkillTree, selectedCourse, setSelectedCourse }) => {
    const [availableCourses, setAvailableCourses] = useState([
        { id: 1, name: '자료구조', selected: false },
        { id: 2, name: '알고리즘', selected: false },
        { id: 3, name: '웹 프로그래밍', selected: false },
        { id: 4, name: '데이터베이스', selected: false },
        { id: 5, name: '머신러닝', selected: false },
        { id: 6, name: '운영체제', selected: false },
        { id: 7, name: '컴퓨터 네트워크', selected: false },
        { id: 8, name: '소프트웨어 공학', selected: false },
        { id: 9, name: '인공지능', selected: false },
        { id: 10, name: '모바일 프로그래밍', selected: false },
        { id: 11, name: '클라우드 컴퓨팅', selected: false },
        { id: 12, name: '정보보안', selected: false },
    ]);

    const [activeTab, setActiveTab] = useState('courses');
    const [filteredSkillTree, setFilteredSkillTree] = useState([]);

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

    // 마운트 시 userCourses로부터 선택 상태 복원
    useEffect(() => {
        if (userCourses && userCourses.length > 0) {
            setAvailableCourses(prev =>
                prev.map(course => ({
                    ...course,
                    selected: userCourses.some(uc => uc.id === course.id)
                }))
            );
        }
    }, []);

    const toggleCourse = (courseId) => {
        setAvailableCourses(prev =>
            prev.map(course =>
                course.id === courseId ? { ...course, selected: !course.selected } : course
            )
        );
    };

    const handleSave = async () => {
        const selected = availableCourses.filter(c => c.selected);

        if (selected.length === 0) {
            alert('최소 1개 이상의 과목을 선택해주세요.');
            return;
        }

        console.log('저장 시도:', selected);

        // 일단 로컬에서 바로 저장 (백엔드 없이도 동작)
        setUserCourses(selected);
        alert('수강 과목이 저장되었습니다! (' + selected.length + '개 과목)');

        // 스킬트리 탭으로 자동 이동
        setActiveTab('skilltree');

        // 백엔드 호출은 비동기로 (실패해도 로컬 저장은 유지)
        try {
            const response = await fetch('http://172.19.31.67:3000/api/user/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    courses: selected.map(c => c.id)
                })
            });

            const data = await response.json();
            console.log('백엔드 응답:', data);

            if (response.ok && data.isSuccess) {
                console.log('백엔드 저장 성공');
            } else {
                console.log('백엔드 저장 실패:', data.message);
            }
        } catch (error) {
            console.error('백엔드 연결 실패:', error);
            // 에러가 나도 이미 로컬에 저장했으므로 계속 진행
        }
    };

    const handleRechooseCourses = () => {
        setActiveTab('courses');
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                {/* 헤더 */}
                <div className="bg-gradient-to-r from-[#FBBAB7] to-[#F49795] p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">마이페이지</h2>
                        <p className="text-white/80 text-sm mt-1">수강 과목을 선택하고 스킬 트리를 확인하세요</p>
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
                                스킬 트리 ({userCourses.length})
                            </div>
                        </button>
                    </div>
                </div>

                {/* 컨텐츠 */}
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                    {activeTab === 'courses' ? (
                        <div className="p-8">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">수강한 과목을 선택해주세요</h3>
                                <p className="text-gray-600 text-sm">
                                    선택한 과목을 바탕으로 맞춤형 스킬 트리와 로드맵이 생성됩니다.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {availableCourses.map((course) => (
                                    <button
                                        key={course.id}
                                        onClick={() => toggleCourse(course.id)}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${course.selected
                                                ? 'border-[#FBBAB7] bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8]'
                                                : 'border-gray-200 bg-white hover:border-[#FBBAB7]/50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-800">{course.name}</span>
                                            {course.selected && (
                                                <div className="w-6 h-6 bg-[#EA7274] rounded-full flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {availableCourses.filter(c => c.selected).length}개 과목 선택됨
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            선택을 완료하면 저장 버튼을 눌러주세요
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-3 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] hover:from-[#F49795] hover:to-[#EA7274] text-white rounded-xl font-bold shadow-lg transition-all flex items-center gap-2"
                                >
                                    <Save className="w-5 h-5" />
                                    저장하기
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8">
                            {filteredSkillTree.length > 0 ? (
                                <SkillTreeTab
                                    skillTree={filteredSkillTree}
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPage;