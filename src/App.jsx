import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Navigation from './components/Navigation';
import RoadmapTab from './components/RoadmapTab';
import JobsTab from './components/JobsTab';
import GapAnalysisTab from './components/GapAnalysisTab';
import CommunityTab from './components/CommunityTab';
import MyPage from './components/Mypage';
import JobSelectorModal from './components/JobSelectorModal';
import { skillTree, careerJobs, gapAnalysis, portfolioData } from './data/mockData';

function App() {
  // 1. 초기 상태를 LocalStorage에서 읽어옵니다.
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'gap'; // 기본값을 'gap'으로 변경
  });

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showMyPage, setShowMyPage] = useState(false);
  const [showJobSelector, setShowJobSelector] = useState(false);
  const [userCourses, setUserCourses] = useState(() => {
    // localStorage에서 userCourses 불러오기
    const saved = localStorage.getItem('userCourses');
    return saved ? JSON.parse(saved) : [];
  });
  const [targetJob, setTargetJob] = useState(() => {
    return localStorage.getItem('targetJob') || '미정';
  });

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('activeTab', activeTab);
      localStorage.setItem('targetJob', targetJob);
    }
  }, [activeTab, targetJob, isLoggedIn]);

  // userCourses 변경 시 localStorage에 저장
  useEffect(() => {
    if (isLoggedIn && userCourses) {
      localStorage.setItem('userCourses', JSON.stringify(userCourses));
      console.log('💾 userCourses 저장됨:', userCourses.length + '개');
    }
  }, [userCourses, isLoggedIn]);

  // 3. 로그인 처리 함수
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setActiveTab('gap'); // 로그인 시 Gap Analysis로 시작
  };

  // 4. 로그아웃 처리 함수
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('activeTab');
    localStorage.removeItem('targetJob');
    localStorage.removeItem('jwtToken'); // JWT 토큰 삭제
    localStorage.removeItem('userName');
    localStorage.removeItem('studentId');
    localStorage.removeItem('userCourses'); // 선택 과목 삭제
    setActiveTab('gap');
    setTargetJob('미정');
    setUserCourses([]); // 로그아웃 시 선택 과목 초기화
  };

  // 5. 마이페이지 열기
  const handleOpenMyPage = () => {
    setShowMyPage(true);
  };

  // 6. 직업 선택 처리
  const handleSelectJob = (jobName) => {
    setTargetJob(jobName);
  };

  // 로그인 전에는 Login 페이지 표시
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5]">
      {/* Header에 handleLogout과 handleOpenMyPage 전달 */}
      <Header
        targetJob={targetJob}
        matchRate={72}
        onLogout={handleLogout}
        onOpenMyPage={handleOpenMyPage}
        onOpenJobSelector={() => setShowJobSelector(true)}
      />

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-6 pb-12">
        {activeTab === 'roadmap' && (
          targetJob === '미정' ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">목표 직업을 먼저 선택해 주세요!</h3>
              <p className="text-gray-600 mb-6">학습 로드맵을 확인하려면 목표 직업을 설정해야 합니다.</p>
              <button
                onClick={() => setShowJobSelector(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] hover:from-[#F49795] hover:to-[#EA7274] text-white font-bold rounded-xl shadow-lg transition-all"
              >
                직업 선택하기
              </button>
            </div>
          ) : (
            <RoadmapTab />
          )
        )}

        {activeTab === 'jobs' && (
          <JobsTab careerJobs={careerJobs} />
        )}

        {activeTab === 'gap' && (
          targetJob === '미정' ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">목표 직업을 먼저 선택해 주세요!</h3>
              <p className="text-gray-600 mb-6">Gap Analysis를 확인하려면 목표 직업을 설정해야 합니다.</p>
              <button
                onClick={() => setShowJobSelector(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] hover:from-[#F49795] hover:to-[#EA7274] text-white font-bold rounded-xl shadow-lg transition-all"
              >
                직업 선택하기
              </button>
            </div>
          ) : (
            <GapAnalysisTab 
              key={JSON.stringify(userCourses)} 
              gapAnalysis={gapAnalysis} 
              targetJob={targetJob} 
            />
          )
        )}

        {activeTab === 'community' && (
          <CommunityTab portfolioData={portfolioData} />
        )}
      </main>

      {/* 마이페이지 모달 */}
      {showMyPage && (
        <MyPage
          onClose={() => setShowMyPage(false)}
          userCourses={userCourses}
          setUserCourses={setUserCourses}
          allSkillTree={skillTree}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />
      )}

      {/* 직업 선택 모달 */}
      {showJobSelector && (
        <JobSelectorModal
          onClose={() => setShowJobSelector(false)}
          onSelectJob={handleSelectJob}
        />
      )}
    </div>
  );
}

export default App;