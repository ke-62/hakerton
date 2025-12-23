import React from 'react';
import { LogOut, User } from 'lucide-react';
import logo from '../assets/Logo_transparent.png';

const Header = ({ targetJob = '미정', matchRate = 72, onLogout, onOpenMyPage, onOpenJobSelector }) => {
  return (
    <header className="border-b border-[#FBBAB7]/30 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center">
              <img 
                src={logo} 
                alt="INDEX Logo" 
                className="h-12 w-auto object-contain" 
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#EA7274]">
                INDEX
              </h1>
              <p className="text-xs text-gray-500">살아있는 진로 로드맵</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenJobSelector}
              className="group text-right hover:bg-[#FFF5F5] px-4 py-2 rounded-xl transition-all"
            >
              <p className="text-xs text-gray-400">목표 직무</p>
              <p className="font-semibold text-gray-700 group-hover:text-[#EA7274] transition-colors flex items-center gap-1">
                {targetJob}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </p>
            </button>
            <div className="flex gap-2">
              <button
                onClick={onOpenMyPage}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                title="마이페이지"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={onLogout}
                className="w-10 h-10 rounded-full bg-[#FFF5F5] hover:bg-[#FFE8E8] flex items-center justify-center transition-colors group"
                title="로그아웃"
              >
                <LogOut className="w-5 h-5 text-[#EA7274] group-hover:text-[#d85d5f]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
