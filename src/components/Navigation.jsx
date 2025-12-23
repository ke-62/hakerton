import React from 'react';
import { Briefcase, BarChart3, Award, Layers } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'roadmap', label: '스킬 트리', icon: Layers },
    { id: 'jobs', label: '실시간 채용', icon: Briefcase },
    { id: 'gap', label: 'Gap Analysis', icon: BarChart3 },
    { id: 'portfolio', label: '포트폴리오', icon: Award }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex gap-3 bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30'
                : 'text-gray-600 hover:bg-gray-50'
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
