import React, { useState, useEffect } from 'react';
import RadarChart from './RadarChart';
import GapList from './GapList';
import { Search } from 'lucide-react';

// 직업별 상세 정보 (fallback용)
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
  const [showResult, setShowResult] = useState(true);
  const [showJobDetailModal, setShowJobDetailModal] = useState(false);
  const [jobDetail, setJobDetail] = useState(null);
  const [isLoadingJobDetail, setIsLoadingJobDetail] = useState(false);
  const [jobDetailError, setJobDetailError] = useState(null);
  const [dynamicGapAnalysis, setDynamicGapAnalysis] = useState(gapAnalysis);
  const [essentialCapabilities, setEssentialCapabilities] = useState(null);
  const [isLoadingCapabilities, setIsLoadingCapabilities] = useState(false);
  const [currentCapabilities, setCurrentCapabilities] = useState([]);
  const [isLoadingCurrentCaps, setIsLoadingCurrentCaps] = useState(false);

  // 현재 역량 데이터 가져오기
  useEffect(() => {
    const fetchCurrentCapabilities = async () => {
      try {
        setIsLoadingCurrentCaps(true);
        const token = localStorage.getItem('jwtToken');
        
        if (!token) {
          setIsLoadingCurrentCaps(false);
          return;
        }

        const response = await fetch(
          'http://172.16.72.219:3000/users/profile/my-capability-values',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.isSuccess && data.result?.capabilityValues) {
            setCurrentCapabilities(data.result.capabilityValues);
          }
        }
      } catch (error) {
        console.error('현재 역량 조회 실패:', error);
      } finally {
        setIsLoadingCurrentCaps(false);
      }
    };

    fetchCurrentCapabilities();
  }, []);

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
        
        if (!token) {
          setJobDetail(null);
          setIsLoadingJobDetail(false);
          return;
        }

        const response = await fetch('http://172.16.72.219:3000/users/profile/desired-job/details/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
          }
          throw new Error(`서버 오류: ${response.status}`);
        }

        const data = await response.json();

        if (data.isSuccess && data.result && data.result.jobDetail) {
          // details가 문자열이면 파싱 시도
          let processedJobDetail = data.result.jobDetail;
          if (typeof processedJobDetail.details === 'string') {
            try {
              processedJobDetail = {
                ...processedJobDetail,
                details: JSON.parse(processedJobDetail.details)
              };
            } catch (e) {
              console.error('JSON 파싱 실패:', e);
            }
          }
          
          setJobDetail(processedJobDetail);
        } else {
          throw new Error(data.message || '직업 상세 정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        console.error('API URL:', 'http://172.16.72.219:3000/users/profile/desired-job/details/all');
        console.error('Token exists:', !!localStorage.getItem('jwtToken'));
        
        // 에러 발생 시 fallback으로 기존 getJobInfo 사용
        setJobDetail(null);
        setJobDetailError(null); // 에러를 조용히 처리하고 fallback 사용
      } finally {
        setIsLoadingJobDetail(false);
      }
    };

    fetchJobDetail();
  }, [targetJob]);

  // AI 서버로 필수역량 6개 추출
  useEffect(() => {
    const fetchEssentialCapabilities = async () => {
      if (!targetJob || targetJob === '미정') {
        setEssentialCapabilities(null);
        setIsLoadingCapabilities(false);
        return;
      }

      try {
        setIsLoadingCapabilities(true);
        const token = localStorage.getItem('jwtToken');
        
        if (!token) {
          setIsLoadingCapabilities(false);
          return;
        }
        const response = await fetch(
          'http://172.16.72.219:3000/users/profile/desired-job/extract-essential-capabilities',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          }
        );

        if (!response.ok) {
          throw new Error(`필수역량 추출 실패: ${response.status}`);
        }

        const data = await response.json();

        if (data.isSuccess && data.result) {
          
          // AI 추출 결과 찾기 - 다양한 필드명 체크
          const extractedCaps = data.result.essentialCapabilities || 
                                data.result.essential_competencies ||  // AI 서버 응답 형식
                                data.result.aiExtractedCapabilities || 
                                data.result.capabilities ||
                                data.result.extractedCapabilities;
          
          if (extractedCaps && Array.isArray(extractedCaps)) {
            // AI 서버 형식 변환: { name, score } → { jobAblNm, jobAblStatus, jobAblCont }
            const formattedCaps = extractedCaps.map(cap => {
              if (cap.name && cap.score !== undefined) {
                // AI 서버 형식
                return {
                  jobAblNm: cap.name,
                  jobAblStatus: String(Math.round(cap.score)),
                  jobAblCont: cap.description || cap.name
                };
              }
              // 이미 올바른 형식이면 그대로 반환
              return cap;
            });
            
            setEssentialCapabilities(formattedCaps);
          } else {
            setEssentialCapabilities(null);
          }
        } else {
          throw new Error(data.message || '필수역량 추출 실패');
        }
      } catch (error) {
        setEssentialCapabilities(null);
      } finally {
        setIsLoadingCapabilities(false);
      }
    };

    fetchEssentialCapabilities();
  }, [targetJob]);

  // essentialCapabilities 변경 시 gapAnalysis 업데이트
  useEffect(() => {
    if (essentialCapabilities && Array.isArray(essentialCapabilities) && essentialCapabilities.length >= 1) {
      // AI가 추출한 역량을 labels로 사용
      const labels = essentialCapabilities.slice(0, 6).map((cap) => {
        return cap.name || cap.capability || cap.title || cap.jobAblNm || cap.knwldgNm || cap;
      });
      
      const targetScores = essentialCapabilities.slice(0, 6).map((cap) => {
        const score = cap.score || cap.importance || cap.weight || 
                      parseInt(cap.jobAblStatus) || parseInt(cap.knwldgStatus) || 90;
        return score;
      });
      
      // 현재 역량 점수 매핑 (백엔드 데이터 기반)
      const currentScores = labels.map(label => {
        // 현재 역량에서 해당 라벨과 매칭되는 역량 찾기
        const matchingCap = currentCapabilities.find(cap => {
          const capName = cap.capabilityName.toLowerCase();
          const labelLower = label.toLowerCase();
          
          // 정확히 일치하거나 포함 관계 확인
          return capName === labelLower || 
                 capName.includes(labelLower) || 
                 labelLower.includes(capName);
        });
        
        if (matchingCap) {
          // value를 100점 만점으로 변환
          return Math.round(matchingCap.value * 100);
        }
        
        // ⚠️ 매칭되는 역량이 없으면 1점 처리 (이수한 과목 없음)
        return 1;
      });
      
      // 6개 미만이면 패딩
      while (labels.length < 6) {
        labels.push('기타역량');
        targetScores.push(75);
        currentScores.push(1);
      }
      
      const updatedGapAnalysis = {
        current: currentScores, // 백엔드에서 가져온 실제 역량 점수 (매칭 안되면 0)
        target: targetScores, // AI가 제공한 중요도 점수
        labels: labels // AI가 추출한 역량명
      };
      
      setDynamicGapAnalysis(updatedGapAnalysis);
    } else {
      // AI 추출 데이터가 없으면 기본 gapAnalysis 사용
      setDynamicGapAnalysis(gapAnalysis);
    }
  }, [essentialCapabilities, gapAnalysis, currentCapabilities]);

  // Helper function to get job info from fetched data or fallback
  const getJobInfoDisplay = () => {
    if (jobDetail && jobDetail.details) {
      const details = jobDetail.details;
      
      // Helper: details의 값이 객체면 특정 필드, 문자열이면 그대로 반환
      const getValue = (key, fieldName) => {
        const data = details[key];
        if (!data) return '';
        
        // 문자열이면 그대로 반환
        if (typeof data === 'string') {
          return data;
        }
        
        // 객체면 특정 필드 반환
        if (typeof data === 'object') {
          // 단순 필드가 있으면 반환
          if (data[fieldName]) {
            return data[fieldName];
          }
          
          // 배열 데이터를 텍스트로 변환
          return '상세 정보는 백엔드 데이터를 참조하세요.';
        }
        
        return '';
      };
      
      // 능력지식환경 객체 파싱
      const parseSkills = (data) => {
        if (typeof data === 'string') return data;
        if (typeof data === 'object' && data.jobAbil) {
          const items = data.jobAbil.map(item => 
            `• ${item.jobAblNm}: ${item.jobAblCont}`
          ).join('\n');
          return items || '정보 없음';
        }
        return '';
      };
      
      // 성격흥미가치관 객체 파싱
      const parsePersonality = (data) => {
        if (typeof data === 'string') return data;
        if (typeof data === 'object' && data.jobChr) {
          const items = data.jobChr.map(item => 
            `• ${item.jobChrNm}: ${item.jobChrCont}`
          ).join('\n');
          return items || '정보 없음';
        }
        return '';
      };
      
      // 업무활동 객체 파싱
      const parseActivities = (data) => {
        if (typeof data === 'string') return data;
        if (typeof data === 'object' && data.jobActvImprtnc) {
          const items = data.jobActvImprtnc.map(item => 
            `• ${item.jobActvImprtncNm}: ${item.jobActvImprtncCont}`
          ).join('\n');
          return items || '정보 없음';
        }
        return '';
      };
      
      const result = {
        summary: getValue('요약', 'jobSum'),
        tasks: getValue('하는일', 'execJob'),
        education: getValue('교육자격훈련', 'technKnow'),
        outlook: getValue('임금직업만족도전망', 'jobProspect'),
        skills: parseSkills(details['능력지식환경']),
        personality: parsePersonality(details['성격흥미가치관']),
        activities: parseActivities(details['업무활동'])
      };
      
      return result;
    }
    
    // Fallback to hardcoded data
    return getJobInfo(targetJob);
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
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

  const jobInfo = getJobInfoDisplay();

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
              {isLoadingJobDetail ? '로딩 중...' : jobInfo.summary}
            </p>
          </div>
        )}

        
        <div className="mt-10">
          {isLoadingCapabilities ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#FBBAB7] border-t-[#EA7274] rounded-full animate-spin mb-4"></div>
              <p className="text-lg text-gray-600 font-medium">필수 역량 분석 중...</p>
              <p className="text-sm text-gray-500 mt-2">AI가 {targetJob}의 필수 역량을 추출하고 있습니다</p>
            </div>
          ) : (
            <RadarChart gapAnalysis={dynamicGapAnalysis} />
          )}
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
      </div>
      
      {/* 오른쪽 핵심 역량 리스트 - 로딩 중에는 표시 안함 */}
      {isLoadingCapabilities ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#FBBAB7] border-t-[#EA7274] rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">핵심 역량 분석 중...</p>
          <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요</p>
        </div>
      ) : essentialCapabilities && essentialCapabilities.length > 0 ? (
        <GapList gapAnalysis={dynamicGapAnalysis} />
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-lg text-gray-600 font-medium">역량 데이터가 없습니다</p>
          <p className="text-sm text-gray-500 mt-2">직업을 선택하고 과목을 저장해주세요</p>
        </div>
      )}

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
                      <p className="text-lg text-gray-700 leading-relaxed">{jobInfo.summary}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">하는 일</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{jobInfo.tasks}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">교육/자격/훈련</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{jobInfo.education}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">임금/직업만족도/전망</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{jobInfo.outlook}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">능력/지식/환경</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{jobInfo.skills}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">성격/흥미/가치관</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{jobInfo.personality}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="font-bold text-gray-800 mb-3 text-xl">업무활동</p>
                      <p className="text-lg text-gray-700 leading-relaxed">{jobInfo.activities}</p>
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