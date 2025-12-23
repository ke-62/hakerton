import React from 'react';
import { Briefcase, BarChart3, Users, Map } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'gap', label: 'Gap Analysis', icon: BarChart3 },
    { id: 'roadmap', label: '학습 로드맵', icon: Map },
    { id: 'jobs', label: '실시간 채용', icon: Briefcase },
    { id: 'community', label: '커뮤니티', icon: Users }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex gap-3 bg-white rounded-2xl p-2 shadow-sm border border-[#FBBAB7]/20">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
              ? 'bg-gradient-to-r from-[#FBBAB7] to-[#F49795] text-white shadow-lg shadow-[#FBBAB7]/30'
              : 'text-gray-600 hover:bg-[#FFF5F5]'
              }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;