import React from 'react';
import { Sparkles, LogOut, User } from 'lucide-react';

const Header = ({ targetJob = '백엔드 개발자', matchRate = 72, onLogout }) => {
  return (
    <header className="border-b border-red-100/20 backdrop-blur-xl bg-white/90">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-red-600">
                re_
              </h1>
              <p className="text-xs text-gray-500">살아있는 진로 로드맵</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-gray-400">목표 직무</p>
              <p className="font-semibold text-gray-700">{targetJob}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border-2 border-red-500 flex items-center justify-center shadow-sm">
              <span className="text-xl font-bold text-red-600">{matchRate}%</span>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={onLogout}
                className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors group"
                title="로그아웃"
              >
                <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
