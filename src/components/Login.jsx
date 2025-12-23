import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import logo from '../assets/Logo_transparent.png';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    name: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId || !formData.password) {
      alert('학번과 비밀번호를 입력해주세요.');
      return;
    }

    if (isSignUp && !formData.name) {
      alert('이름을 입력해주세요.');
      return;
    }

    // ⚠️ 개발 중 임시 로그인 - 실제 배포 시 아래 주석 해제하고 이 부분 삭제
    // console.log('임시 로그인:', { userId: formData.userId });
    // alert(`${formData.userId}님, 환영합니다! (개발용 임시 로그인)`);
    // localStorage.setItem('userName', formData.userId);
    // localStorage.setItem('studentId', formData.userId);
    // onLogin();
    // return;

    // ⬇️ 실제 배포 시 주석 해제
    try {
      if (isSignUp) {
        // 회원가입 기능은 추후 구현
        alert('회원가입 기능은 준비 중입니다.');
        return;
      }

      console.log('로그인 시도:', { userId: formData.userId });

      // 로그인 API 호출
      const response = await fetch('http://172.16.72.219:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          password: formData.password
        })
      });

      console.log('응답 상태:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: 서버 응답 오류`);
      }
      
      const data = await response.json();
      console.log('응답 데이터:', data);

      if (data.isSuccess) {
        // 로그인 성공 - JWT 토큰을 localStorage에 저장
        console.log('전체 응답 데이터:', JSON.stringify(data, null, 2));
        const token = data.result?.token || data.token || data.result?.accessToken || data.accessToken || data.result?.jwtToken;
        console.log('받은 토큰:', token ? '✅ 존재' : '❌ 없음');
        console.log('토큰 값:', token);
        
        if (token) {
          localStorage.setItem('jwtToken', token);
          console.log('토큰 저장 완료:', token.substring(0, 20) + '...');
        } else {
          console.error('⚠️ 백엔드 응답에 토큰이 없습니다!');
          console.error('응답 구조 확인:', data);
        }
        
        localStorage.setItem('userName', data.result.name);
        localStorage.setItem('studentId', data.result.studentId);
        
        alert(`${data.result.name}님, 환영합니다!`);
        onLogin();
      } else {
        // 로그인 실패
        alert(data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 에러 상세:', error);
      console.error('에러 타입:', error.name);
      console.error('에러 메시지:', error.message);
      alert(`서버와 연결할 수 없습니다.\n\n에러: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] via-[#FFF5F5] to-[#FFE8E8] flex items-center justify-center p-4">
      {/* 배경 장식 요소 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FBBAB7] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-[#F49795] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-[#EA7274] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* 메인 컨테이너 */}
      <div className="relative z-10 w-full max-w-6xl flex items-start gap-12 pt-4">
        {/* 왼쪽: 브랜딩 영역 */}
        <div className="flex-1 hidden lg:block">
          <div className="space-y-8">
            {/* 로고 */}
            <div className="flex items-center justify-center">
              <div className="w-40 h-40 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="INDEX Logo" 
                  className="w-full h-auto object-contain" 
                />
              </div>
            </div>

            {/* 큰 타이틀 */}
            <div className="space-y-6">
              <h2 className="text-6xl font-bold leading-tight">
                <span className="text-gray-800">나만의</span>
                <br />
                <span className="text-[#EA7274]">커리어를</span>
                <br />
                <span className="text-gray-800">디자인하세요</span>
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                AI가 분석한 실시간 채용 트렌드로<br />
                당신만의 성장 경로를 만들어가세요
              </p>
            </div>

          </div>
        </div>

        {/* 오른쪽: 로그인 폼 */}
        <div className="flex-1 max-w-xl">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#FBBAB7]/20 p-12 border border-[#FBBAB7]/30">
            {/* 폼 헤더 */}
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <div className="w-20 h-20 flex items-center justify-center">
                  <img 
                    src={logo} 
                    alt="INDEX Logo" 
                    className="h-16 w-auto object-contain" 
                  />
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
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#FBBAB7] rounded-xl outline-none transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="학번"
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#FBBAB7] rounded-xl outline-none transition-all"
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
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#FBBAB7] rounded-xl outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FBBAB7] to-[#F49795] hover:from-[#F49795] hover:to-[#EA7274] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#FBBAB7]/50 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                {isSignUp ? '가입하기' : '로그인'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* 푸터 */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>© 2025 INDEX. All rights reserved.</p>
          </div>
        </div>
      </div>

      <style>{`
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