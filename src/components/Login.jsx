import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center p-4">
      {/* 배경 장식 요소 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* 메인 컨테이너 */}
      <div className="relative z-10 w-full max-w-6xl flex items-center gap-12">
        {/* 왼쪽: 브랜딩 영역 */}
        <div className="flex-1 hidden lg:block">
          <div className="space-y-8">
            {/* 로고 */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/50 rotate-6 hover:rotate-0 transition-transform duration-300">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-red-600">re_</h1>
                <p className="text-sm text-gray-500 mt-1">살아있는 진로 로드맵</p>
              </div>
            </div>

            {/* 큰 타이틀 */}
            <div className="space-y-6">
              <h2 className="text-6xl font-bold leading-tight">
                <span className="text-gray-800">나만의</span>
                <br />
                <span className="text-red-600">커리어를</span>
                <br />
                <span className="text-gray-800">디자인하세요</span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                AI가 분석한 실시간 채용 트렌드로<br />
                당신만의 성장 경로를 만들어가세요
              </p>
            </div>

            {/* 이미지 갤러리 */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="aspect-square bg-gradient-to-br from-red-100 to-red-200 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-5xl">📊</div>
                </div>
              </div>
              <div className="aspect-square bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-5xl">🎯</div>
                </div>
              </div>
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-5xl">🚀</div>
                </div>
              </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-red-200">
              <div>
                <div className="text-3xl font-bold text-red-600">2,847</div>
                <div className="text-sm text-gray-500 mt-1">성공한 선배들</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600">850+</div>
                <div className="text-sm text-gray-500 mt-1">실시간 채용공고</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600">95%</div>
                <div className="text-sm text-gray-500 mt-1">목표 달성률</div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 로그인 폼 */}
        <div className="flex-1 max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-red-500/20 p-10 border border-red-100">
            {/* 폼 헤더 */}
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/50">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {isSignUp ? '회원가입' : '로그인'}
              </h3>
              <p className="text-gray-500">
                {isSignUp ? '새로운 여정을 시작하세요' : '다시 만나서 반가워요!'}
              </p>
            </div>

            {/* 폼 */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignUp && (
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="이름"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 rounded-xl outline-none transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="이메일"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 rounded-xl outline-none transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 rounded-xl outline-none transition-all"
                />
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-red-500" />
                    <span className="text-gray-600">로그인 유지</span>
                  </label>
                  <a href="#" className="text-red-500 hover:text-red-600 font-medium">
                    비밀번호 찾기
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/50 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                {isSignUp ? '가입하기' : '로그인'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* 구분선 */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">또는</span>
              </div>
            </div>

            {/* 소셜 로그인 */}
            <div className="space-y-3">
              <button className="w-full bg-white border-2 border-gray-200 hover:border-red-500 text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition-all">
                <div className="w-5 h-5 bg-yellow-400 rounded"></div>
                카카오로 시작하기
              </button>
              <button className="w-full bg-white border-2 border-gray-200 hover:border-red-500 text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition-all">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                네이버로 시작하기
              </button>
            </div>

            {/* 회원가입/로그인 전환 */}
            <div className="text-center mt-8 text-sm">
              <span className="text-gray-600">
                {isSignUp ? '이미 계정이 있으신가요?' : '아직 계정이 없으신가요?'}
              </span>
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-red-500 hover:text-red-600 font-bold"
              >
                {isSignUp ? '로그인' : '회원가입'}
              </button>
            </div>
          </div>

          {/* 푸터 */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>© 2024 살아있는 진로 로드맵. All rights reserved.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;
