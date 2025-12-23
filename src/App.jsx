import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SkillTreeTab from './components/SkillTreeTab';
import JobsTab from './components/JobsTab';
import GapAnalysisTab from './components/GapAnalysisTab';
import PortfolioTab from './components/PortfolioTab';
import { skillTree, liveJobs, gapAnalysis, portfolioData } from './data/mockData';

function App() {
  // 1. 초기 상태를 LocalStorage에서 읽어옵니다.
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'roadmap';
  });

  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('activeTab', activeTab);
    }
  }, [activeTab, isLoggedIn]);

  // 3. 로그인 처리 함수
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // 4. 로그아웃 처리 함수
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('activeTab'); // 로그아웃 시 저장된 탭 정보 삭제
    setActiveTab('roadmap');
  };

  // 로그인 전에는 Login 페이지 표시
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />; // handleLogin 전달
  }
  return (
    <div className="min-h-screen bg-[#FFF9F5]">
      {/* Header에 handleLogout 전달 */}
      <Header targetJob="백엔드 개발자" matchRate={72} onLogout={handleLogout} />

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-6 pb-12">
        {activeTab === 'roadmap' && (
          <SkillTreeTab
            skillTree={skillTree}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
          />
        )}

        {activeTab === 'jobs' && (
          <JobsTab liveJobs={liveJobs} />
        )}

        {activeTab === 'gap' && (
          <GapAnalysisTab gapAnalysis={gapAnalysis} />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioTab portfolioData={portfolioData} />
        )}
      </main>
    </div>
  );
}

export default App;
