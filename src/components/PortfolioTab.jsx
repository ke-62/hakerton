import React from 'react';
import { Award, Download } from 'lucide-react';

const PortfolioTab = ({ portfolioData }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">AI 자동 생성 포트폴리오</h2>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-medium shadow-lg shadow-red-500/30 transition-all">
          <Download className="w-5 h-5" />
          PDF로 다운로드
        </button>
      </div>

      {/* 자기소개 */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-1 bg-gradient-to-r from-red-500 to-rose-600 rounded"></span>
          자기소개
        </h3>
        <p className="text-gray-700 leading-relaxed">
          저는 <span className="text-red-600 font-semibold">자료구조, 알고리즘, 웹 프로그래밍</span> 과목을 통해 견고한 개발 기초를 다졌으며, 
          특히 <span className="text-rose-600 font-semibold">Spring Boot를 활용한 백엔드 개발</span>에 강점을 가지고 있습니다. 
          데이터베이스 설계부터 RESTful API 구현까지 전 과정을 경험하며 실무 역량을 쌓았습니다.
        </p>
      </div>

      {/* 핵심 역량 */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-1 bg-gradient-to-r from-red-500 to-rose-600 rounded"></span>
          핵심 역량
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {portfolioData.coreSkills.map((skill, idx) => (
            <div 
              key={idx} 
              className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <Award className="w-6 h-6 text-red-600" />
              <span className="font-medium text-gray-700">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 프로젝트 경험 */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-1 bg-gradient-to-r from-red-500 to-rose-600 rounded"></span>
          프로젝트 경험
        </h3>
        <div className="space-y-6">
          {portfolioData.projects.map((project, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-bold text-red-600">{project.title}</h4>
                <span className="text-sm text-gray-500">{project.period}</span>
              </div>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, skillIdx) => (
                  <span 
                    key={skillIdx}
                    className="px-3 py-1 bg-red-50 border border-red-200 rounded-full text-sm text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 추가 섹션 제안 */}
      <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
        <h4 className="font-bold text-amber-800 mb-2">💡 AI 제안</h4>
        <p className="text-sm text-gray-700">
          "알고리즘" 과목을 수강하면 "코딩 테스트 경험" 섹션이 자동으로 추가됩니다. 
          "오픈소스 기여" 섹션을 추가하려면 GitHub 연동을 활성화하세요.
        </p>
      </div>
    </div>
  );
};

export default PortfolioTab;
