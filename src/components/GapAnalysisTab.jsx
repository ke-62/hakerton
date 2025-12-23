import React, { useState, useEffect } from 'react';
import RadarChart from './RadarChart';
import GapList from './GapList';
import { Search } from 'lucide-react';

// 직업별 상세 정보
const getJobInfo = (jobName) => {
  const jobData = {
    '백엔드개발자': {
      summary: '웹 서비스의 서버, 데이터베이스, API 등 백엔드 시스템을 설계하고 개발하는 개발자입니다.',
      tasks: '서버 프로그램 개발, 데이터베이스 설계 및 관리, RESTful API 설계 및 구현, 서버 성능 최적화, 보안 시스템 구축',
      education: '컴퓨터공학 전공 우대, 관련 부트캠프 또는 온라인 강의 수료. Java, Python, Node.js 등의 백엔드 언어 숙련도 필요',
      outlook: '평균 연봉 4,500만원~7,000만원. 클라우드 서비스 확대로 수요 지속 증가. 만족도 높음',
      skills: '프로그래밍 언어(Java, Python, Node.js), 데이터베이스(MySQL, MongoDB), 서버 지식, 문제 해결 능력',
      personality: '논리적 사고, 꼼꼼함, 문제 해결에 대한 열정, 지속적 학습 의지',
      activities: '코드 작성 및 테스트, 데이터베이스 쿼리 최적화, API 문서 작성, 코드 리뷰, 서버 모니터링'
    },
    '프론트엔드개발자': {
      summary: '웹사이트와 웹 애플리케이션의 사용자 인터페이스를 구현하고 최적화하는 개발자입니다.',
      tasks: 'UI/UX 디자인 구현, 웹 페이지 반응형 레이아웃 개발, 사용자 인터랙션 구현, 성능 최적화, 크로스 브라우징 처리',
      education: '컴퓨터공학 또는 디자인 전공 우대. HTML, CSS, JavaScript 필수. React, Vue 등 프레임워크 경험 요구',
      outlook: '평균 연봉 4,000만원~6,500만원. 모바일 우선 웹 개발 증가로 수요 높음. 만족도 양호',
      skills: 'HTML/CSS, JavaScript, React/Vue, 반응형 디자인, UI/UX 이해도, 웹 접근성',
      personality: '미적 감각, 사용자 중심 사고, 세심함, 트렌드에 대한 관심',
      activities: 'UI 컴포넌트 개발, 디자인 시스템 구축, 성능 측정 및 개선, 브라우저 호환성 테스트, 사용자 피드백 반영'
    },
    '데이터엔지니어': {
      summary: '대용량 데이터를 수집, 저장, 처리할 수 있는 데이터 파이프라인을 구축하고 관리하는 전문가입니다.',
      tasks: '데이터 파이프라인 설계 및 구축, ETL 프로세스 개발, 데이터 웨어하우스 관리, 데이터 품질 관리, 빅데이터 처리 시스템 구축',
      education: '컴퓨터공학, 통계학 전공 우대. SQL, Python 필수. Hadoop, Spark 등 빅데이터 기술 경험 필요',
      outlook: '평균 연봉 5,000만원~8,000만원. 데이터 기반 의사결정 확대로 수요 급증. 만족도 매우 높음',
      skills: 'SQL, Python, 데이터베이스 설계, ETL 도구, 클라우드 플랫폼(AWS, GCP), 분산 처리 시스템',
      personality: '논리적 사고, 체계적 접근, 데이터에 대한 이해, 문제 해결 능력',
      activities: '데이터 파이프라인 개발, 데이터 모델링, 데이터 품질 검증, 성능 모니터링, 데이터 인프라 최적화'
    },
    'AI/ML엔지니어': {
      summary: '인공지능과 머신러닝 모델을 개발하고 실제 서비스에 적용하는 전문가입니다.',
      tasks: '머신러닝 모델 설계 및 학습, 데이터 전처리 및 특성 추출, 모델 성능 최적화, AI 서비스 배포, 모델 모니터링 및 개선',
      education: '컴퓨터공학, 수학, 통계학 전공 우대. Python, TensorFlow/PyTorch 필수. 석사 이상 학위 선호',
      outlook: '평균 연봉 6,000만원~10,000만원. AI 기술 확산으로 수요 폭발적 증가. 만족도 매우 높음',
      skills: 'Python, 머신러닝/딥러닝 프레임워크, 수학/통계, 데이터 분석, 알고리즘 최적화',
      personality: '분석적 사고, 수학적 직관, 실험 정신, 지속적 학습 의지, 창의성',
      activities: '데이터 분석 및 전처리, 모델 설계 및 학습, 하이퍼파라미터 튜닝, A/B 테스트, 연구 논문 리뷰'
    },
    'DevOps엔지니어': {
      summary: '개발과 운영을 연결하여 소프트웨어 배포 자동화와 시스템 안정성을 책임지는 전문가입니다.',
      tasks: 'CI/CD 파이프라인 구축, 인프라 자동화, 컨테이너 오케스트레이션, 모니터링 시스템 구축, 장애 대응',
      education: '컴퓨터공학 전공 우대. Linux, Docker, Kubernetes 필수. 클라우드 자격증(AWS, Azure) 우대',
      outlook: '평균 연봉 5,500만원~8,500만원. 클라우드 네이티브 전환으로 수요 급증. 만족도 높음',
      skills: 'Linux, Docker/Kubernetes, CI/CD 도구, 클라우드 플랫폼, 스크립팅, 모니터링 도구',
      personality: '문제 해결 능력, 자동화 마인드, 꼼꼼함, 스트레스 관리 능력, 소통 능력',
      activities: '배포 자동화 구축, 인프라 코드 작성, 시스템 모니터링, 장애 분석 및 해결, 성능 최적화'
    },
    '보안엔지니어': {
      summary: '정보 시스템과 네트워크를 보호하고 보안 위협에 대응하는 전문가입니다.',
      tasks: '보안 취약점 분석, 침입 탐지 시스템 관리, 보안 정책 수립, 해킹 시도 모니터링, 보안 사고 대응',
      education: '컴퓨터공학, 정보보안 전공 우대. 정보보안기사, CISSP 등 자격증 필요. 해킹 및 보안 도구 경험 필수',
      outlook: '평균 연봉 5,000만원~9,000만원. 사이버 위협 증가로 수요 지속 증가. 만족도 높음',
      skills: '네트워크 보안, 암호화 기술, 침투 테스트, 보안 프레임워크, 법규 및 컴플라이언스',
      personality: '세심함, 분석적 사고, 책임감, 윤리 의식, 지속적 학습 의지',
      activities: '보안 취약점 스캔, 침투 테스트, 로그 분석, 보안 정책 문서화, 보안 교육 실시'
    }
  };
  
  return jobData[jobName] || {
    summary: `${jobName}는 해당 분야에서 전문적인 지식과 기술을 요구하는 직업입니다.`,
    tasks: '관련 업무 수행',
    education: '관련 전공 또는 교육 과정 이수',
    outlook: '분야에 따라 다양한 전망',
    skills: '해당 직무에 필요한 전문 기술',
    personality: '직무에 적합한 성격 및 태도',
    activities: '일상적인 업무 활동'
  };
};

const GapAnalysisTab = ({ gapAnalysis, targetJob }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(true); // 로그인 시 바로 결과 표시
  const [showJobDetailModal, setShowJobDetailModal] = useState(false);
  const [jobDetail, setJobDetail] = useState(null);
  const [isLoadingJobDetail, setIsLoadingJobDetail] = useState(false);
  const [jobDetailError, setJobDetailError] = useState(null);

  // Fetch job details from backend
  useEffect(() => {
    const fetchJobDetail = async () => {
      if (!targetJob || targetJob === '미정') {
        setJobDetail(null);
        return;
      }

      setIsLoadingJobDetail(true);
      setJobDetailError(null);

      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch('http://172.19.31.67:3000/users/profile/desired-job/details', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('백엔드 서버에 연결할 수 없습니다.');
        }

        const data = await response.json();
        if (data.isSuccess && data.result) {
          setJobDetail(data.result.jobDetail);
        } else {
          throw new Error(data.message || '직업 상세 정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        // 에러 발생 시 fallback으로 기존 getJobInfo 사용 (에러 메시지는 저장하지 않음)
        // 이렇게 하면 백엔드 없이도 기본 데이터로 작동
        setJobDetail(null);
        setJobDetailError(null); // 에러 메시지를 표시하지 않고 조용히 fallback
      } finally {
        setIsLoadingJobDetail(false);
      }
    };

    fetchJobDetail();
  }, [targetJob]);

  // Helper function to get job info from fetched data or fallback
  const getJobInfoDisplay = () => {
    if (jobDetail && jobDetail.details) {
      const details = jobDetail.details;
      return {
        summary: details['요약']?.content || details['요약']?.dtlInfo || '',
        tasks: details['하는일']?.content || details['하는일']?.dtlInfo || '',
        education: details['교육자격훈련']?.content || details['교육자격훈련']?.dtlInfo || '',
        outlook: details['임금직업만족도전망']?.content || details['임금직업만족도전망']?.dtlInfo || '',
        skills: details['능력지식환경']?.content || details['능력지식환경']?.dtlInfo || '',
        personality: details['성격흥미가치관']?.content || details['성격흥미가치관']?.dtlInfo || '',
        activities: details['업무활동']?.content || details['업무활동']?.dtlInfo || ''
      };
    }
    // Fallback to hardcoded data
    return getJobInfo(targetJob);
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    // 1.5초 후 분석 결과 표시 (로딩 연출)
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 1500);
  };

  if (!showResult) {
    return (
      <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-20 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
          <Search className={`w-10 h-10 text-red-500 ${isAnalyzing ? 'animate-bounce' : ''}`} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">나의 역량 갭 분석하기</h2>
        <p className="text-gray-500 mb-8 text-center">
          현재 보유한 기술과 목표 직무에서 요구하는 기술을<br />
          AI가 정밀하게 비교 분석합니다.
        </p>
        <button
          onClick={handleStartAnalysis}
          disabled={isAnalyzing}
          className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {isAnalyzing ? '데이터 분석 중...' : '분석 시작하기'}
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 animate-in fade-in duration-500">
      {/* 육각형 레이더 차트 */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        {/* 선택한 직업 정보 - 요약만 표시 */}
        {targetJob && targetJob !== '미정' && (
          <div 
            onClick={() => setShowJobDetailModal(true)}
            className="mb-6 bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8] border-2 border-[#FBBAB7] rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-gray-600 font-semibold">목표 직업</p>
                <h3 className="text-2xl font-bold text-gray-800">{targetJob}</h3>
              </div>
              <button className="text-base text-[#F49795] font-bold hover:text-[#EA7274]">
                상세보기 →
              </button>
            </div>
            <p className="text-base text-gray-700 mt-3 leading-relaxed">
              {isLoadingJobDetail ? '로딩 중...' : getJobInfoDisplay().summary}
            </p>
          </div>
        )}

        
        <div className="mt-10">
          <RadarChart gapAnalysis={gapAnalysis} />
        </div>

        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-rose-500 rounded"></div>
            <span className="text-xl text-gray-700 font-semibold">현재 역량</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-500/50 rounded border-2 border-red-500"></div>
            <span className="text-xl text-gray-700 font-semibold">목표 역량</span>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-3 text-2xl">종합 분석</h3>
          <p className="text-xl text-gray-700 leading-relaxed">
            현재 웹개발 역량이 가장 우수하며, AI/ML 분야에서 가장 큰 성장 기회가 있습니다.
            목표 달성을 위해 시스템설계 과목 이수를 추천합니다.
          </p>
        </div>
      </div>
      <GapList gapAnalysis={gapAnalysis} />

      {/* 직업 상세 정보 모달 */}
      {showJobDetailModal && targetJob && targetJob !== '미정' && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowJobDetailModal(false)}
          >
            <div 
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="sticky top-0 bg-gradient-to-r from-[#FBBAB7] to-[#F49795] text-white p-8 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl opacity-90 font-semibold">목표 직업</p>
                    <h2 className="text-4xl font-bold mt-1">{targetJob}</h2>
                  </div>
                  <button 
                    onClick={() => setShowJobDetailModal(false)}
                    className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 내용 */}
              <div className="p-8 space-y-5">
                {isLoadingJobDetail ? (
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <p className="text-lg text-gray-600">직업 상세 정보를 불러오는 중...</p>
                  </div>
                ) : jobDetailError ? (
                  <div className="bg-red-50 rounded-xl p-6 text-center border border-red-200">
                    <p className="text-lg text-red-600">{jobDetailError}</p>
                    <p className="text-base text-gray-600 mt-2">기본 정보를 표시합니다.</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">요약</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{getJobInfoDisplay().summary}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">하는 일</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{getJobInfoDisplay().tasks}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">교육/자격/훈련</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{getJobInfoDisplay().education}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">임금/직업만족도/전망</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{getJobInfoDisplay().outlook}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">능력/지식/환경</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{getJobInfoDisplay().skills}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">성격/흥미/가치관</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{getJobInfoDisplay().personality}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">업무활동</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{getJobInfoDisplay().activities}</p>
                    </div>
                  </>
                )}
              </div>

              {/* 푸터 */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-2xl">
                <button
                  onClick={() => setShowJobDetailModal(false)}
                  className="w-full bg-gradient-to-r from-[#FBBAB7] to-[#F49795] text-white py-3 rounded-xl text-lg font-bold hover:shadow-lg transition-shadow"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default GapAnalysisTab;