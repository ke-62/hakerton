import React, { useState } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SkillTreeTab from './components/SkillTreeTab';
import JobsTab from './components/JobsTab';
import GapAnalysisTab from './components/GapAnalysisTab';
import PortfolioTab from './components/PortfolioTab';
import { skillTree, liveJobs, gapAnalysis, portfolioData } from './data/mockData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('roadmap');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // 로그인 전에는 Login 페이지 표시
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // 로그인 후 메인 앱 표시
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      <Header targetJob="백엔드 개발자" matchRate={72} />
      
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
